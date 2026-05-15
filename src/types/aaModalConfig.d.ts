import type { AaModalConfig } from '@real-token/types';

/** Champs ajoutés par patch-package sur @real-token/aa-modal */
export type YamAaModalConfig = AaModalConfig & {
  defaultConnectionMode?: 'aa' | 'external' | 'tba';
  connectionModeConfig?: AaModalConfig['connectionModeConfig'] & {
    external?: NonNullable<AaModalConfig['connectionModeConfig']>['external'] & {
      /** IDs registre Web3Auth ; si défini, seuls ces wallets sont affichés (ordre conservé) */
      allowedWalletIds?: string[];
    };
  };
};
