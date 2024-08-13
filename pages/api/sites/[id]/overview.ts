/* eslint-disable */
import { NextApiRequest, NextApiResponse } from 'next';

import { LRUCache } from 'lru-cache';

// cache 60 min
const cache = new LRUCache<string, any>({ max: 500, ttl: 1000 * 60 * 60 });

const getTransactions = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { id } = req.query;

    if (!id) {
      return res.status(400).json({
        error: "L'id est manquant dans les paramètres de l'URL.",
      });
    }

    // Generate a cache key based on the address, page, and pageSize
    const cacheKey = `overview-${id}`;

    // Check if the response is cached
    const cachedData = cache.get(cacheKey);
    if (cachedData) {
      return res.status(200).json(cachedData);
    }

    const apiUrl = `https://dashboard.cleansatmining.net/api/sites/${id}/overview`;
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error('Erreur lors de la récupération des données.');
    }

    const data = await response.json();

    // Cache the response for future use
    cache.set(cacheKey, data);

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({
      error: 'Une erreur est survenue lors de la récupération des données.',
    });
  }
};

export default getTransactions;
