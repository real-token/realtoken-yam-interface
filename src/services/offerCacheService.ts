import { Offer } from 'src/types/offer/Offer';
import { BigNumber } from '@ethersproject/bignumber';

const DB_NAME = 'YAM_OFFERS_CACHE';
const DB_VERSION = 2; // Incrémenté pour ajouter lastAccessed
const STORE_NAME = 'offers';

// Configuration du cache
const MAX_CACHED_OFFERS = 50; // Nombre maximum d'offres en cache
const CACHE_TTL = 24 * 60 * 60 * 1000; // 24 heures en millisecondes
const EVENT_LISTENING_TTL = 60 * 60 * 1000; // 1 heure - arrêter d'écouter les événements après ce délai

interface CachedOffer {
  offer: Partial<Offer>;
  chainId: number;
  offerId: string;
  lastUpdated: number;
  lastAccessed: number; // Dernière consultation (pour LRU)
  lastEventBlock?: number;
  source: 'rpc' | 'thegraph';
}

/**
 * Service de cache local persistant pour les offres
 * Utilise IndexedDB pour la persistance
 * Mise à jour via événements blockchain
 */
export class OfferCacheService {
  private db: IDBDatabase | null = null;
  private initPromise: Promise<void> | null = null;

  /**
   * Initialise la base de données IndexedDB
   */
  private async initDB(): Promise<void> {
    if (this.db) return;

    if (this.initPromise) {
      return this.initPromise;
    }

    this.initPromise = new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, DB_VERSION);

      request.onerror = () => {
        console.error('Failed to open IndexedDB:', request.error);
        reject(request.error);
      };

      request.onsuccess = () => {
        this.db = request.result;
        resolve();
      };

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        const transaction = (event.target as IDBOpenDBRequest).transaction;

        // Créer l'object store s'il n'existe pas
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          const store = db.createObjectStore(STORE_NAME, {
            keyPath: ['chainId', 'offerId'],
          });

          // Index pour rechercher par chainId
          store.createIndex('chainId', 'chainId', { unique: false });
          // Index pour rechercher par lastUpdated
          store.createIndex('lastUpdated', 'lastUpdated', { unique: false });
          // Index pour rechercher par lastAccessed (LRU)
          store.createIndex('lastAccessed', 'lastAccessed', { unique: false });
        } else if (transaction) {
          // Migration : ajouter l'index lastAccessed si nécessaire
          const store = transaction.objectStore(STORE_NAME);
          if (!store.indexNames.contains('lastAccessed')) {
            store.createIndex('lastAccessed', 'lastAccessed', {
              unique: false,
            });
          }

          // Migration : ajouter lastAccessed aux offres existantes
          const migrationRequest = store.openCursor();
          migrationRequest.onsuccess = (e) => {
            const cursor = (e.target as IDBRequest<IDBCursorWithValue>).result;
            if (cursor) {
              const offer = cursor.value;
              if (!offer.lastAccessed) {
                offer.lastAccessed = offer.lastUpdated || Date.now();
                cursor.update(offer);
              }
              cursor.continue();
            }
          };
        }
      };
    });

    return this.initPromise;
  }

  /**
   * Récupère une offre depuis le cache
   * Met à jour automatiquement la date d'accès (LRU)
   */
  async getOffer(
    chainId: number,
    offerId: string | number | BigNumber
  ): Promise<CachedOffer | null> {
    await this.initDB();
    if (!this.db) return null;

    const id = offerId instanceof BigNumber ? offerId.toString() : offerId.toString();

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([STORE_NAME], 'readwrite');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.get([chainId, id]);

      request.onsuccess = async () => {
        const cached = request.result;
        
        if (!cached) {
          resolve(null);
          return;
        }

        // Vérifier si le cache a expiré (TTL)
        const age = Date.now() - cached.lastUpdated;
        if (age > CACHE_TTL) {
          // Cache expiré, supprimer
          const deleteRequest = store.delete([chainId, id]);
          deleteRequest.onsuccess = () => {
            resolve(null);
          };
          deleteRequest.onerror = () => {
            console.error('Error deleting expired offer:', deleteRequest.error);
            resolve(null);
          };
          return;
        }

        // Mettre à jour la date d'accès (LRU)
        cached.lastAccessed = Date.now();
        const updateRequest = store.put(cached);
        
        updateRequest.onsuccess = () => {
          resolve(cached);
        };
        
        updateRequest.onerror = () => {
          console.error('Error updating access time:', updateRequest.error);
          resolve(cached); // Retourner quand même l'offre
        };
      };

      request.onerror = () => {
        console.error('Error getting offer from cache:', request.error);
        reject(request.error);
      };
    });
  }

  /**
   * Récupère une offre sans mettre à jour lastAccessed (méthode interne)
   */
  private async getOfferWithoutUpdate(
    chainId: number,
    offerId: string
  ): Promise<CachedOffer | null> {
    await this.initDB();
    if (!this.db) return null;

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([STORE_NAME], 'readonly');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.get([chainId, offerId]);

      request.onsuccess = () => {
        const cached = request.result;
        if (!cached) {
          resolve(null);
          return;
        }

        // Vérifier si le cache a expiré (TTL)
        const age = Date.now() - cached.lastUpdated;
        if (age > CACHE_TTL) {
          resolve(null);
          return;
        }

        resolve(cached);
      };

      request.onerror = () => {
        console.error('Error getting offer from cache:', request.error);
        reject(request.error);
      };
    });
  }

  /**
   * Sauvegarde une offre dans le cache
   * Gère automatiquement la limite de taille et supprime les offres les plus anciennes
   */
  async setOffer(
    chainId: number,
    offerId: string | number | BigNumber,
    offer: Partial<Offer>,
    source: 'rpc' | 'thegraph' = 'rpc',
    lastEventBlock?: number
  ): Promise<void> {
    await this.initDB();
    if (!this.db) return;

    const id = offerId instanceof BigNumber ? offerId.toString() : offerId.toString();
    const now = Date.now();

    // Vérifier si l'offre existe déjà (sans mettre à jour lastAccessed)
    const existing = await this.getOfferWithoutUpdate(chainId, id);
    const lastAccessed = existing?.lastAccessed || now;

    const cachedOffer: CachedOffer = {
      offer,
      chainId,
      offerId: id,
      lastUpdated: now,
      lastAccessed, // Conserver la date d'accès si l'offre existe déjà
      lastEventBlock,
      source,
    };

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([STORE_NAME], 'readwrite');
      const store = transaction.objectStore(STORE_NAME);
      
      // Sauvegarder l'offre
      const putRequest = store.put(cachedOffer);

      putRequest.onsuccess = async () => {
        // Vérifier et nettoyer le cache si nécessaire
        try {
          await this.enforceCacheLimit(chainId);
          resolve();
        } catch (err) {
          console.error('Error enforcing cache limit:', err);
          resolve(); // Ne pas faire échouer la sauvegarde
        }
      };

      putRequest.onerror = () => {
        console.error('Error saving offer to cache:', putRequest.error);
        reject(putRequest.error);
      };
    });
  }

  /**
   * Met à jour la date d'accès d'une offre (pour LRU)
   */
  async updateAccessTime(
    chainId: number,
    offerId: string | number | BigNumber
  ): Promise<void> {
    const cached = await this.getOffer(chainId, offerId);
    if (cached) {
      cached.lastAccessed = Date.now();
      await this.setOffer(
        chainId,
        offerId,
        cached.offer,
        cached.source,
        cached.lastEventBlock
      );
    }
  }

  /**
   * Applique la limite de taille du cache en supprimant les offres les plus anciennes (LRU)
   */
  private async enforceCacheLimit(chainId: number): Promise<void> {
    await this.initDB();
    if (!this.db) return;

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([STORE_NAME], 'readwrite');
      const store = transaction.objectStore(STORE_NAME);
      const index = store.index('chainId');
      const request = index.getAll(chainId);

      request.onsuccess = () => {
        const offers: CachedOffer[] = request.result;

        // Si on dépasse la limite, supprimer les offres les moins récemment consultées
        if (offers.length > MAX_CACHED_OFFERS) {
          // Trier par lastAccessed (plus ancien en premier)
          offers.sort((a, b) => a.lastAccessed - b.lastAccessed);

          // Supprimer les offres les plus anciennes
          const toDelete = offers.slice(0, offers.length - MAX_CACHED_OFFERS);
          let deleted = 0;
          const totalToDelete = toDelete.length;

          if (totalToDelete === 0) {
            resolve();
            return;
          }

          toDelete.forEach((cachedOffer) => {
            const deleteRequest = store.delete([chainId, cachedOffer.offerId]);
            deleteRequest.onsuccess = () => {
              deleted++;
              if (deleted === totalToDelete) {
                resolve();
              }
            };
            deleteRequest.onerror = () => {
              console.error('Error deleting old offer:', deleteRequest.error);
              deleted++;
              if (deleted === totalToDelete) {
                resolve();
              }
            };
          });
        } else {
          resolve();
        }
      };

      request.onerror = () => {
        console.error('Error getting offers for cache limit:', request.error);
        reject(request.error);
      };
    });
  }

  /**
   * Met à jour une offre existante dans le cache
   * Utilisé lors des événements blockchain
   */
  async updateOffer(
    chainId: number,
    offerId: string | number | BigNumber,
    updates: Partial<Offer>,
    lastEventBlock?: number
  ): Promise<void> {
    const cached = await this.getOffer(chainId, offerId);

    if (cached) {
      // Fusionner les mises à jour avec l'offre existante
      const updatedOffer = {
        ...cached.offer,
        ...updates,
      };

      await this.setOffer(
        chainId,
        offerId,
        updatedOffer,
        cached.source,
        lastEventBlock
      );
    }
  }

  /**
   * Supprime une offre du cache
   * Utilisé lors de l'événement OfferDeleted
   */
  async deleteOffer(
    chainId: number,
    offerId: string | number | BigNumber
  ): Promise<void> {
    await this.initDB();
    if (!this.db) return;

    const id = offerId instanceof BigNumber ? offerId.toString() : offerId.toString();

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([STORE_NAME], 'readwrite');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.delete([chainId, id]);

      request.onsuccess = () => {
        resolve();
      };

      request.onerror = () => {
        console.error('Error deleting offer from cache:', request.error);
        reject(request.error);
      };
    });
  }

  /**
   * Vérifie si une offre est en cache et si elle est encore valide
   * @param ttl TTL en millisecondes (optionnel, par défaut pas de TTL si mise à jour via événements)
   */
  async isOfferCached(
    chainId: number,
    offerId: string | number | BigNumber,
    ttl?: number
  ): Promise<boolean> {
    const cached = await this.getOffer(chainId, offerId);

    if (!cached) return false;

    // Si TTL spécifié, vérifier si le cache est encore valide
    if (ttl) {
      const age = Date.now() - cached.lastUpdated;
      return age < ttl;
    }

    // Pas de TTL = cache persistant (mise à jour via événements)
    return true;
  }

  /**
   * Nettoie les offres expirées du cache (TTL)
   */
  async cleanExpiredOffers(): Promise<number> {
    await this.initDB();
    if (!this.db) return 0;

    const cutoff = Date.now() - CACHE_TTL;
    let deleted = 0;

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([STORE_NAME], 'readwrite');
      const store = transaction.objectStore(STORE_NAME);
      const index = store.index('lastUpdated');
      const request = index.openCursor(IDBKeyRange.upperBound(cutoff));

      request.onsuccess = (event) => {
        const cursor = (event.target as IDBRequest<IDBCursorWithValue>).result;
        if (cursor) {
          cursor.delete();
          deleted++;
          cursor.continue();
        } else {
          resolve(deleted);
        }
      };

      request.onerror = () => {
        console.error('Error cleaning expired offers:', request.error);
        reject(request.error);
      };
    });
  }

  /**
   * Vérifie si une offre doit encore écouter les événements blockchain
   * Retourne true si l'offre est récente (moins de EVENT_LISTENING_TTL)
   */
  async shouldListenToEvents(
    chainId: number,
    offerId: string | number | BigNumber
  ): Promise<boolean> {
    const cached = await this.getOffer(chainId, offerId);
    if (!cached) return false;

    const age = Date.now() - cached.lastAccessed;
    return age < EVENT_LISTENING_TTL;
  }

  /**
   * Récupère toutes les offres en cache pour une chaîne
   * Utile pour nettoyer les listeners d'événements
   */
  async getAllCachedOffers(chainId: number): Promise<CachedOffer[]> {
    await this.initDB();
    if (!this.db) return [];

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([STORE_NAME], 'readonly');
      const store = transaction.objectStore(STORE_NAME);
      const index = store.index('chainId');
      const request = index.getAll(chainId);

      request.onsuccess = () => {
        resolve(request.result || []);
      };

      request.onerror = () => {
        console.error('Error getting all cached offers:', request.error);
        reject(request.error);
      };
    });
  }
}

// Instance singleton
export const offerCacheService = new OfferCacheService();
