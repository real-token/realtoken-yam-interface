import { useTranslation } from 'react-i18next';

import { Flex } from '@mantine/core';
import {
  useGetNetworkById,
  useIsUnsuportedNetwork,
  useRealTokenUIConfig,
} from '@real-token/core';
import { IconAlertCircle } from '@tabler/icons-react';
import clsx from 'clsx';

import { useAppSwitchChain } from 'src/hooks/useAppSwitchChain';
import { parseChainId } from 'src/utils/chainId';

import classes from './Banner.module.css';

/**
 * Bannière réseau non supporté avec bascule Web3Auth (remplace celle de ui-components).
 */
export function YamUnsupportedNetworkBanner() {
  const { t } = useTranslation('common', { keyPrefix: 'wallet' });
  const { defaultNetworkId } = useRealTokenUIConfig();
  const { switchChain } = useAppSwitchChain();
  const defaultChainId = parseChainId(defaultNetworkId);
  const defaultNetworkConfig = useGetNetworkById(defaultChainId);
  const isUnsuportedNetwork = useIsUnsuportedNetwork();

  if (!isUnsuportedNetwork || !defaultNetworkConfig) {
    return null;
  }

  return (
    <Flex gap={4} className={clsx(classes.message)} role="alert">
      <IconAlertCircle
        size={20}
        aria-label="Network"
        style={{ marginRight: '8px' }}
      />
      <div>
        {t('notAllowedNetwork')}
        <span
          role="button"
          tabIndex={0}
          onClick={() =>
            void switchChain({ chainId: defaultChainId })
          }
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              void switchChain({ chainId: defaultChainId });
            }
          }}
          style={{ cursor: 'pointer', textDecoration: 'underline' }}
        >
          {t('switchNetwork', {
            networkName: defaultNetworkConfig.displayName,
          })}
        </span>
      </div>
    </Flex>
  );
}
