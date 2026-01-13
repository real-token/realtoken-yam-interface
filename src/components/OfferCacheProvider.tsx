import { FC, ReactNode } from 'react';
import { useOfferCacheEvents } from 'src/hooks/offers/useOfferCache';

/**
 * Provider pour activer l'écoute des événements blockchain au niveau global
 * Met à jour automatiquement le cache local (IndexedDB) et React Query
 */
export const OfferCacheProvider: FC<{ children: ReactNode }> = ({ children }) => {
  // Activer l'écoute des événements blockchain
  useOfferCacheEvents();

  return <>{children}</>;
};
