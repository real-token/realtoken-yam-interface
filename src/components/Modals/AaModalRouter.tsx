import { FC } from 'react';

import { ContextModalProps } from '@mantine/modals';
import { AaModal } from '@real-token/aa-modal';

import { shouldUseAaModal } from 'src/config/web3AuthEnv';

import { WagmiFallbackWalletModal } from './WagmiFallbackWalletModal';

export const AaModalRouter: FC<ContextModalProps<Record<string, unknown>>> = (
  props
) => {
  if (shouldUseAaModal()) {
    return <AaModal {...props} />;
  }

  return <WagmiFallbackWalletModal {...props} innerProps={{}} />;
};
