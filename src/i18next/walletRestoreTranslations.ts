import i18next from 'i18next';

const RECONNECTING_KEY = 'general.reconnecting';

const bundles = {
  fr: 'Reconnexion du portefeuille…',
  en: 'Reconnecting wallet…',
  es: 'Reconectando la cartera…',
} as const;

let isRegistered = false;

export function registerWalletRestoreTranslations(): void {
  if (isRegistered) return;
  isRegistered = true;

  for (const [lng, message] of Object.entries(bundles)) {
    i18next.addResource(lng, 'common', RECONNECTING_KEY, message);
  }
}
