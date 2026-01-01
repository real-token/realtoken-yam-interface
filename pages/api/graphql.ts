import { NextApiHandler } from 'next';

import { gql } from '@apollo/client';

import { gzip } from 'zlib';

import { createLogger } from '../../src/utils/logger';
import { apiClient } from '../../src/utils/offers/getClientURL';

const logger = createLogger('API /graphql');

/**
 * Endpoint GraphQL polyvalent
 * Fait le pont entre le client et l'API GraphQL avec authentification automatique côté serveur
 * Toutes les requêtes passent par l'API Gateway (NEXT_PUBLIC_API_URL) qui route vers TheGraph si nécessaire
 *
 * POST /api/graphql
 * Body: {
 *   query: string (requête GraphQL),
 *   variables?: object
 * }
 */
const handler: NextApiHandler = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { query, variables } = req.body;

    if (!query || typeof query !== 'string') {
      return res
        .status(400)
        .json({ error: 'query is required and must be a string' });
    }

    // Toutes les requêtes passent par l'API Gateway (api.realtoken.network)
    // L'API Gateway route automatiquement vers TheGraph si nécessaire
    const client = apiClient;

    // Parser la requête GraphQL avec gql
    const parsedQuery = gql(query);

    // Exécuter la requête GraphQL
    // Utiliser errorPolicy: 'none' pour que les erreurs soient propagées normalement
    // Si on veut gérer les erreurs partielles, on peut utiliser 'all' mais il faut alors
    // vérifier explicitement result.errors
    const queryPreview = query.substring(0, 100).replace(/\s+/g, ' ');
    const result = await client.query({
      query: parsedQuery,
      variables: variables || {},
      errorPolicy: 'all', // Permet de recevoir les données même en cas d'erreur partielle
      fetchPolicy: 'no-cache', // Désactive le cache pour éviter les problèmes de merge et réduire la mémoire
    });
    logger.debug('Query preview:', queryPreview);
    logger.debug('Result:', result);
    // Vérifier s'il y a des erreurs
    if (result.errors && result.errors.length > 0) {
      logger.log(
        'Errors found, checking for auth errors...',
        result.errors.length
      );
      const hasAuthError = result.errors.some((e: any) => {
        const code = e?.extensions?.code;
        const msg = (e?.message || '').toLowerCase();
        const hasError =
          code === 'THEGRAPH_AUTH_ERROR' ||
          code === 'AUTHENTICATION_ERROR' ||
          code === 'DOWNSTREAM_SERVICE_ERROR' ||
          msg.includes('invalid authentication token') ||
          msg.includes('invalid authentication') ||
          msg.includes('authentication failed') ||
          msg.includes('unauthorized') ||
          msg.includes('forbidden') ||
          msg.includes('no authentication token provided') ||
          msg.includes('authorization required');

        if (hasError) {
          logger.debug('Auth error detected:', {
            code,
            msg: e?.message,
            hasError: true,
          });
        }

        return hasError;
      });

      logger.debug('hasAuthError result:', hasAuthError);

      if (hasAuthError) {
        // Retourner l'erreur d'authentification avec le statut 401
        logger.info('Returning 401 with errors for query:', queryPreview);
        const responseData = {
          data: result.data || null,
          errors: result.errors,
        };
        return sendCompressedResponse(res, 401, responseData);
      }

      // Si ce ne sont pas des erreurs d'authentification, retourner quand même avec les erreurs
      const responseData = {
        data: result.data,
        errors: result.errors,
      };
      return sendCompressedResponse(res, 200, responseData);
    }

    // Retourner le résultat (pas d'erreurs)
    logger.debug('No errors, returning 200 for query:', queryPreview);
    const responseData = {
      data: result.data,
      errors: null,
    };
    return sendCompressedResponse(res, 200, responseData);
  } catch (error: any) {
    logger.error('Error:', error);

    // Vérifier si c'est une erreur d'authentification
    const errorMessage = error?.message?.toLowerCase() || '';
    const graphQLErrors = error?.graphQLErrors || [];
    const networkError = error?.networkError;
    const statusCode = networkError?.statusCode || networkError?.status;

    // Détecter les erreurs 401/403 (nginx ou API)
    const hasAuthError =
      statusCode === 401 ||
      statusCode === 403 ||
      graphQLErrors.some((e: any) => {
        const code = e?.extensions?.code;
        const msg = e?.message?.toLowerCase() || '';
        return (
          code === 'THEGRAPH_AUTH_ERROR' ||
          code === 'AUTHENTICATION_ERROR' ||
          msg.includes('invalid authentication token') ||
          msg.includes('invalid authentication') ||
          msg.includes('authentication failed') ||
          msg.includes('unauthorized') ||
          msg.includes('forbidden') ||
          msg.includes('no authentication token provided') ||
          msg.includes('authorization required')
        );
      }) ||
      errorMessage.includes('invalid authentication token') ||
      errorMessage.includes('invalid authentication') ||
      errorMessage.includes('authentication failed') ||
      errorMessage.includes('unauthorized') ||
      errorMessage.includes('forbidden') ||
      errorMessage.includes('no authentication token provided') ||
      errorMessage.includes('authorization required') ||
      (networkError?.result &&
        typeof networkError.result === 'string' &&
        networkError.result.includes('401 Authorization Required'));

    if (hasAuthError) {
      const responseData = {
        error: 'Authentication error',
        message:
          networkError?.result && typeof networkError.result === 'string'
            ? 'Authentication required - token missing or invalid'
            : error?.message || 'Authentication failed',
        errors: error?.graphQLErrors || null,
      };
      return sendCompressedResponse(res, 401, responseData);
    }

    const responseData = {
      error: 'GraphQL query failed',
      message: error?.message || 'Unknown error',
      errors: error?.graphQLErrors || null,
    };
    return sendCompressedResponse(res, 500, responseData);
  }
};

/**
 * Envoie une réponse compressée avec gzip pour réduire la taille
 * et éviter la limite de 4MB de Next.js
 */
async function sendCompressedResponse(res: any, statusCode: number, data: any) {
  try {
    const jsonString = JSON.stringify(data);
    const jsonBuffer = Buffer.from(jsonString, 'utf-8');

    // Compresser avec gzip (convertir Buffer en Uint8Array pour compatibilité TypeScript)
    const compressed = await new Promise<Buffer>((resolve, reject) => {
      gzip(
        new Uint8Array(
          jsonBuffer.buffer,
          jsonBuffer.byteOffset,
          jsonBuffer.byteLength
        ),
        (err, result) => {
          if (err) reject(err);
          else resolve(result);
        }
      );
    });

    // Définir les headers pour la compression
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Content-Encoding', 'gzip');
    res.setHeader('Content-Length', compressed.length);

    logger.debug(
      `Response compressed: ${jsonBuffer.length} bytes -> ${
        compressed.length
      } bytes (${Math.round(
        (1 - compressed.length / jsonBuffer.length) * 100
      )}% reduction)`
    );

    // Envoyer la réponse compressée
    res.status(statusCode);
    res.write(compressed);
    return res.end();
  } catch (compressionError) {
    // En cas d'erreur de compression, envoyer la réponse non compressée
    logger.log(
      'Compression failed, sending uncompressed response:',
      compressionError
    );
    return res.status(statusCode).json(data);
  }
}

/**
 * Configuration Next.js pour désactiver la limite de taille de réponse
 * Permet de gérer de grandes réponses (>4MB) nécessaires pour les tris
 */
export const config = {
  api: {
    responseLimit: false, // Désactive la limite de 4MB
  },
};

export default handler;
