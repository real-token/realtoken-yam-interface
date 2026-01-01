import { createLogger } from '../logger';

const logger = createLogger('AuthService');

/**
 * Lit une variable d'environnement directement depuis le fichier .env
 * pour éviter les problèmes d'interprétation des caractères spéciaux (comme $)
 * 
 * @param varName Nom de la variable (ex: 'AUTH_USER')
 * @returns La valeur brute depuis le .env, ou null si non trouvée
 */
function readEnvVarFromFile(varName: string): string | null {
  // Seulement côté serveur Node.js
  if (typeof window !== 'undefined' || typeof process === 'undefined' || !process.versions?.node) {
    return null;
  }

  try {
    const fs = require('fs');
    const path = require('path');
    
    const envPath = path.join(process.cwd(), '.env');
    
    if (!fs.existsSync(envPath)) {
      return null;
    }

    const envContent = fs.readFileSync(envPath, 'utf-8');
    const lines = envContent.split('\n');

    for (const line of lines) {
      const trimmedLine = line.trim();
      if (!trimmedLine || trimmedLine.startsWith('#')) {
        continue;
      }

      // Chercher la variable
      if (!trimmedLine.startsWith(varName + '=') && !trimmedLine.startsWith(varName + ' =')) {
        continue;
      }

      // Extraire la valeur après le signe =
      const equalIndex = trimmedLine.indexOf('=');
      if (equalIndex === -1) {
        continue;
      }

      let value = trimmedLine.substring(equalIndex + 1).trim();

      // Si la valeur est entre guillemets simples ou doubles, les retirer
      if (
        (value.startsWith("'") && value.endsWith("'")) ||
        (value.startsWith('"') && value.endsWith('"'))
      ) {
        value = value.slice(1, -1);
      }

      return value;
    }

    return null;
  } catch (error) {
    // Si fs n'est pas disponible, retourner null silencieusement
    if (error instanceof Error && error.message.includes('Cannot find module')) {
      return null;
    }
    logger.error(`Error reading ${varName} from .env:`, error);
    return null;
  }
}

/**
 * Service pour gérer l'authentification automatique côté serveur uniquement
 * 
 * Logique (par ordre de priorité) :
 * 1. Si AUTH_TOKEN est défini → utiliser le token JWT directement
 * 2. Si AUTH_USER est défini → tenter login automatique pour obtenir JWT
 * 3. Si pas défini → pas de token, l'API fonctionne sans (production)
 */
export class AuthService {
  private static token: string | null = null;
  private static initialized = false;
  private static initializing: Promise<void> | null = null;

  /**
   * Initialise le token au démarrage (serveur uniquement)
   * Tente le login automatique UNIQUEMENT si AUTH_USER est défini
   */
  static async initialize(): Promise<void> {
    // Seulement côté serveur
    if (typeof window !== 'undefined') {
      return;
    }

    // Si une initialisation est déjà en cours, attendre qu'elle se termine
    if (this.initializing) {
      await this.initializing;
      return;
    }

    if (this.initialized) {
      return;
    }

    // Créer une promesse d'initialisation pour éviter les appels concurrents
    this.initializing = this._doInitialize();

    try {
      await this.initializing;
    } finally {
      this.initializing = null;
    }
  }

  private static async _doInitialize(): Promise<void> {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    
    // Priorité 1: Vérifier s'il y a un token JWT direct dans .env
    const directToken = readEnvVarFromFile('AUTH_TOKEN') || readEnvVarFromFile('NEXT_PUBLIC_AUTH_TOKEN');
    if (directToken) {
      this.token = directToken;
      logger.info('✓ Token JWT utilisé directement depuis .env');
      this.initialized = true;
      return;
    }
    
    // Priorité 2: Tenter le login automatique si user/password sont définis
    const user = readEnvVarFromFile('AUTH_USER') || readEnvVarFromFile('NEXT_PUBLIC_AUTH_USER');
    const password = readEnvVarFromFile('AUTH_PASSWORD') || readEnvVarFromFile('NEXT_PUBLIC_AUTH_PASSWORD');

    // Si AUTH_USER n'est pas défini, pas besoin de token (production)
    if (!user || !password || !apiUrl) {
      this.initialized = true;
      return;
    }

    // Tenter le login automatique
    try {
      this.token = await this.login(user, password, apiUrl);
      logger.info('✓ Login successful, token obtained');
    } catch (error) {
      // En cas d'erreur de login, continuer sans token
      // En production, l'API devrait fonctionner sans token
      // Mais si l'API nécessite un token et qu'on ne peut pas l'obtenir, on log l'erreur
      const errorMsg = error instanceof Error ? error.message : String(error);
      logger.log('⚠ Failed to initialize token (continuing without token):', errorMsg);
      this.token = null;
    } finally {
      // Toujours marquer comme initialisé, même en cas d'erreur
      // Cela permet aux requêtes de continuer sans token (production)
      this.initialized = true;
    }
  }

  /**
   * Récupère le token de manière asynchrone (serveur uniquement)
   * Initialise de manière lazy si nécessaire (évite les race conditions au build)
   */
  static async getTokenAsync(): Promise<string | null> {
    // Seulement côté serveur
    if (typeof window !== 'undefined') {
      return null;
    }

    // Initialisation lazy : seulement quand le token est demandé
    // Cela évite les race conditions lors du build Next.js
    if (this.initializing) {
      await this.initializing;
    } else if (!this.initialized) {
      await this.initialize();
    }
    return this.token;
  }

  /**
   * Récupère le token JWT (synchrone, serveur uniquement)
   */
  static getToken(): string | null {
    if (typeof window !== 'undefined') {
      return null;
    }
    return this.token;
  }

  /**
   * Effectue la mutation login pour obtenir le token JWT
   */
  private static async login(
    email: string,
    password: string,
    apiUrl: string
  ): Promise<string | null> {
    const LOGIN_MUTATION = `
      mutation Login($email: String!, $password: String!) {
        auth {
          login(email: $email, password: $password) {
            token
          }
        }
      }
    `;

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: LOGIN_MUTATION,
        variables: {
          email,
          password,
        },
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    if (data.errors) {
      throw new Error(data.errors[0]?.message || 'Login failed');
    }

    const token = data.data?.auth?.login?.token;

    if (!token) {
      throw new Error('No token received from login mutation');
    }

    return token;
  }

  /**
   * Réinitialise le token (utile pour forcer un nouveau login)
   */
  static resetToken(): void {
    this.token = null;
    this.initialized = false;
    this.initializing = null;
  }
}
