import { FC, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Text, Stack, Paper, Button, useMantineTheme, useMantineColorScheme } from '@mantine/core';
import { IconAlertCircle, IconRefresh } from '@tabler/icons';
import { useAuthError } from 'src/hooks/interface/useAuthError';
import { useQueryClient } from 'react-query';

interface AuthenticationErrorOverlayProps {
  children: ReactNode;
}

/**
 * Composant qui bloque complètement l'interface en cas d'erreur d'authentification
 * Affiche un message d'erreur standard et empêche toute interaction
 */
export const AuthenticationErrorOverlay: FC<AuthenticationErrorOverlayProps> = ({
  children,
}) => {
  const { t } = useTranslation('notifications');
  const { hasAuthError, errorMessage } = useAuthError();
  const queryClient = useQueryClient();
  const theme = useMantineTheme();
  const { colorScheme } = useMantineColorScheme();

  const handleRetry = () => {
    // Réessayer toutes les queries en erreur
    queryClient.refetchQueries();
  };

  if (!hasAuthError) {
    return <>{children}</>;
  }

  const overlayBgColor = colorScheme === 'dark'
    ? 'rgba(0, 0, 0, 0.8)'
    : 'rgba(0, 0, 0, 0.6)';

  const paperBgColor = colorScheme === 'dark'
    ? theme.colors.dark[7]
    : theme.white;

  return (
    <Box style={{ position: 'relative', width: '100%', height: '100%', minHeight: '100vh' }}>
      {children}
      <Box
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: overlayBgColor,
          backdropFilter: 'blur(4px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999,
          pointerEvents: 'auto',
        }}
      >
        <Paper
          p="xl"
          radius="md"
          shadow="xl"
          style={{
            backgroundColor: paperBgColor,
            maxWidth: '500px',
            textAlign: 'center',
            pointerEvents: 'auto',
            border: colorScheme === 'dark' ? `1px solid ${theme.colors.dark[4]}` : undefined,
          }}
        >
          <Stack gap="md" align="center">
            <IconAlertCircle size={48} color={theme.colors.red[6]} />
            <Text fw={700} size="xl" c="red">
              {t('authenticationError.title')}
            </Text>
            <Text size="sm" c="dimmed">
              {t('authenticationError.message')}
            </Text>
            {errorMessage && (
              <Text size="xs" c="dimmed" style={{ fontFamily: 'monospace' }}>
                {errorMessage}
              </Text>
            )}
            <Text size="xs" c="dimmed" mt="xs">
              {t('authenticationError.tip')}
            </Text>
            <Button
              leftSection={<IconRefresh size={16} />}
              onClick={handleRetry}
              variant="light"
              color="blue"
              mt="md"
            >
              {t('authenticationError.retry')}
            </Button>
          </Stack>
        </Paper>
      </Box>
    </Box>
  );
};
