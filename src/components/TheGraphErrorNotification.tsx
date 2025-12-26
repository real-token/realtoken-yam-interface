import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { notifications } from '@mantine/notifications';
import { IconAlertTriangle, IconX } from '@tabler/icons';
import { useDegradedMode } from 'src/hooks/interface/useDegradedMode';
import { Anchor, Stack, Text } from '@mantine/core';
import { Link } from '@realtoken/realt-commons';

/**
 * Composant qui affiche une notification non-bloquante en cas d'erreur TheGraph
 * Ne bloque pas l'interface, permet un fonctionnement partiel
 */
export const TheGraphErrorNotification: React.FC = () => {
  const { t } = useTranslation('notifications');
  const { isDegraded, errorType, errorMessage, subgraphUrl, parsedError } = useDegradedMode();
  const notificationShownRef = useRef<string | null>(null);

  useEffect(() => {
    // Ne pas afficher si pas en mode dégradé
    if (!isDegraded || !parsedError) {
      // Si on était en mode dégradé et qu'on ne l'est plus, fermer la notification
      if (notificationShownRef.current) {
        notifications.hide(notificationShownRef.current);
        notificationShownRef.current = null;
      }
      return;
    }

    // Ne pas afficher plusieurs fois la même notification
    const errorKey = `${errorType}-${subgraphUrl || 'no-url'}`;
    if (notificationShownRef.current === errorKey) {
      return;
    }

    // Fermer l'ancienne notification si elle existe
    if (notificationShownRef.current) {
      notifications.hide(notificationShownRef.current);
    }

    // Construire le message selon le type d'erreur
    let title: string;
    let message: React.ReactNode;
    const color = 'orange';

    if (errorType === 'SUBGRAPH_INDEXING_ERROR') {
      title = t('theGraphError.indexingError.title');
      message = (
        <Stack gap={4}>
          <Text size="sm">{t('theGraphError.indexingError.message')}</Text>
          {subgraphUrl && (
            <Anchor component={Link} href={subgraphUrl} target="_blank" size="sm">
              {t('theGraphError.indexingError.checkStatus')}
            </Anchor>
          )}
          <Text size="xs" c="dimmed" mt={4}>
            {t('theGraphError.indexingError.tip')}
          </Text>
        </Stack>
      );
    } else if (errorType === 'NETWORK_ERROR') {
      title = t('theGraphError.networkError.title');
      message = (
        <Stack gap={4}>
          <Text size="sm">{t('theGraphError.networkError.message')}</Text>
          <Text size="xs" c="dimmed" mt={4}>
            {t('theGraphError.networkError.tip')}
          </Text>
        </Stack>
      );
    } else {
      title = t('theGraphError.unknownError.title');
      message = (
        <Stack gap={4}>
          <Text size="sm">{t('theGraphError.unknownError.message')}</Text>
          {errorMessage && (
            <Text size="xs" c="dimmed">
              {errorMessage}
            </Text>
          )}
        </Stack>
      );
    }

    // Afficher la notification
    const notificationId = notifications.show({
      id: `thegraph-error-${errorKey}`,
      title,
      message,
      color,
      icon: <IconAlertTriangle size={18} />,
      autoClose: false, // Ne pas fermer automatiquement pour que l'utilisateur puisse voir le problème
      withCloseButton: true,
      onClose: () => {
        notificationShownRef.current = null;
      },
    });

    notificationShownRef.current = errorKey;
  }, [isDegraded, errorType, errorMessage, subgraphUrl, parsedError, t]);

  // Nettoyer la notification quand le composant est démonté
  useEffect(() => {
    return () => {
      if (notificationShownRef.current) {
        notifications.hide(notificationShownRef.current);
      }
    };
  }, []);

  return null; // Ce composant ne rend rien, il gère juste les notifications
};
