import { ExternalWalletWeb3AuthShield } from 'src/wallet/ExternalWalletWeb3AuthShield';
import { useWalletOrchestrator } from 'src/wallet/useWalletOrchestrator';

/**
 * Restaure la dernière session wallet après F5 et persiste l'état connecté.
 */
export function WalletSessionRestore() {
  useWalletOrchestrator();
  return <ExternalWalletWeb3AuthShield />;
}
