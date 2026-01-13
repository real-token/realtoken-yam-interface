import { FC, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Text, Stack, Paper, useMantineTheme, useMantineColorScheme } from '@mantine/core';
import { IconAlertTriangle } from '@tabler/icons';
import { useDegradedMode } from 'src/hooks/interface/useDegradedMode';

interface DegradedModeOverlayProps {
  children: ReactNode;
  /**
   * Si true, l'overlay couvre complètement le contenu et empêche l'interaction
   * Si false, l'overlay est transparent et permet l'interaction (pour afficher des données partielles)
   */
  blockInteraction?: boolean;
}

/**
 * Composant qui ajoute un overlay en mode dégradé pour indiquer visuellement
 * que certaines parties de l'interface ne fonctionnent pas correctement
 */
export const DegradedModeOverlay: FC<DegradedModeOverlayProps> = ({
  children,
  blockInteraction = true,
}) => {
  const { t } = useTranslation('notifications');
  const { isDegraded, errorType } = useDegradedMode();
  const theme = useMantineTheme();
  const { colorScheme } = useMantineColorScheme();

  if (!isDegraded) {
    return <>{children}</>;
  }

  // Couleurs adaptées au thème (clair ou sombre)
  const overlayBgColor = colorScheme === 'dark'
    ? blockInteraction
      ? 'rgba(0, 0, 0, 0.6)'
      : 'rgba(0, 0, 0, 0.3)'
    : blockInteraction
      ? 'rgba(0, 0, 0, 0.4)'
      : 'rgba(0, 0, 0, 0.15)';

  const paperBgColor = colorScheme === 'dark'
    ? theme.colors.dark[7]
    : theme.white;

  return (
    <Box style={{ position: 'relative', width: '100%', height: '100%' }}>
      {children}
      <Box
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: overlayBgColor,
          backdropFilter: 'blur(2px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 10,
          pointerEvents: blockInteraction ? 'auto' : 'none',
          transition: 'all 0.3s ease',
        }}
      >
        <Paper
          p="md"
          radius="md"
          shadow="md"
          style={{
            backgroundColor: paperBgColor,
            maxWidth: '400px',
            textAlign: 'center',
            pointerEvents: 'auto',
            border: colorScheme === 'dark' ? `1px solid ${theme.colors.dark[4]}` : undefined,
          }}
        >
          <Stack gap="sm" align="center">
            <IconAlertTriangle size={32} color="orange" />
            <Text fw={600} size="lg">
              {errorType === 'SUBGRAPH_INDEXING_ERROR'
                ? t('degradedMode.overlay.indexingError.title')
                : errorType === 'NETWORK_ERROR'
                  ? t('degradedMode.overlay.networkError.title')
                  : t('degradedMode.overlay.generic.title')}
            </Text>
            <Text size="sm" c="dimmed">
              {errorType === 'SUBGRAPH_INDEXING_ERROR'
                ? t('degradedMode.overlay.indexingError.message')
                : errorType === 'NETWORK_ERROR'
                  ? t('degradedMode.overlay.networkError.message')
                  : t('degradedMode.overlay.generic.message')}
            </Text>
            {!blockInteraction && (
              <Text size="xs" c="dimmed" mt="xs">
                {t('degradedMode.overlay.partialData')}
              </Text>
            )}
          </Stack>
        </Paper>
      </Box>
    </Box>
  );
};
