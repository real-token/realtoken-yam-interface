import { NextApiRequest, NextApiResponse } from 'next';

import { LRUCache } from 'lru-cache';

// cache 60 min
const cache = new LRUCache<string, any>({ max: 500, ttl: 1000 * 60 * 60 });

const getTransactions = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { address, page = 1, pageSize = 1000 } = req.query;

    if (!address) {
      return res.status(400).json({
        error: "L'adresse est manquante dans les paramètres de l'URL.",
      });
    }

    // Generate a cache key based on the address, page, and pageSize
    const cacheKey = `${address}-${page}-${pageSize}`;

    // Check if the response is cached
    const cachedData = cache.get(cacheKey);
    if (cachedData) {
      return res.status(200).json(cachedData);
    }

    const apiKey = process.env.GNOSISSCAN_API_KEY;
    if (!apiKey) {
      return res.status(400).json({
        error: "L'api key n'est pas valide.",
      });
    }

    const apiUrl = `https://api.gnosisscan.io/api?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&page=${page}&offset=${pageSize}&sort=desc&apikey=${apiKey}`;
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
