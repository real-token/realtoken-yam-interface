const WEB3AUTH_PLACEHOLDER_VALUES = new Set([
  '',
  'your_web3auth_api_key',
  'api-key-web3auth',
]);

const WALLETCONNECT_PLACEHOLDER_VALUES = new Set([
  '',
  'your_walletconnect_project_id',
  'walletconnect-project-id',
]);

function isPlaceholder(
  value: string | undefined,
  placeholders: Set<string>
): boolean {
  if (!value?.trim()) return true;
  return placeholders.has(value.trim());
}

function parseEnvFlag(value: string | undefined): boolean | undefined {
  if (value === undefined || value.trim() === '') return undefined;
  const normalized = value.trim().toLowerCase();
  if (['true', '1', 'yes', 'on'].includes(normalized)) return true;
  if (['false', '0', 'no', 'off'].includes(normalized)) return false;
  return undefined;
}

/** Client ID Web3Auth valide (pas un placeholder du .env.example). */
export function isWeb3AuthConfigured(): boolean {
  return !isPlaceholder(
    import.meta.env.VITE_WEB3_AUTH_API_KEY,
    WEB3AUTH_PLACEHOLDER_VALUES
  );
}

/** Project ID WalletConnect valide. */
export function isWalletConnectConfigured(): boolean {
  return !isPlaceholder(
    import.meta.env.VITE_WC_PROJECTID,
    WALLETCONNECT_PLACEHOLDER_VALUES
  );
}

/**
 * Active l’onglet RealToken AA dans la modale.
 * `VITE_ENABLE_AA_WALLET_LOGIN=false` force la désactivation.
 * Sinon : activé seulement si Web3Auth est configuré.
 */
export function isAaWalletLoginEnabled(): boolean {
  const override = parseEnvFlag(import.meta.env.VITE_ENABLE_AA_WALLET_LOGIN);
  if (override === false) return false;
  if (override === true) return isWeb3AuthConfigured();
  return isWeb3AuthConfigured();
}

/** Utiliser la modale @real-token/aa-modal (Web3Auth) plutôt que le fallback wagmi. */
export function shouldUseAaModal(): boolean {
  return isWeb3AuthConfigured() && isAaWalletLoginEnabled();
}
