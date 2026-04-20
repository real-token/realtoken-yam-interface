/**
 * Runs on Vercel before `yarn install`: appends GitHub Packages auth to .npmrc.
 * Logs only non-secret diagnostics (token length, not value).
 */
// #region agent log
const fs = require('fs');
const path = require('path');

const token = (process.env.NODE_AUTH_TOKEN || process.env.NPM_TOKEN || '')
  .toString()
  .trim();
const diag = {
  sessionId: '2a5f23',
  hypothesisId: 'H5-env-visible',
  location: 'scripts/vercel-pre-yarn.cjs',
  message: 'Vercel pre-yarn auth probe',
  data: {
    hasNodeAuthToken: Boolean(process.env.NODE_AUTH_TOKEN && String(process.env.NODE_AUTH_TOKEN).trim()),
    hasNpmToken: Boolean(process.env.NPM_TOKEN && String(process.env.NPM_TOKEN).trim()),
    tokenCharLength: token.length,
  },
  timestamp: Date.now(),
};
console.log('[vercel-install]', JSON.stringify(diag));
// #endregion

if (!token) {
  console.error(
    '[vercel-install] Aucun jeton: définir NODE_AUTH_TOKEN (recommandé) ou NPM_TOKEN dans les variables du projet Vercel pour les environnements qui buildent cette branche.',
  );
  process.exit(1);
}

const npmrcPath = path.join(process.cwd(), '.npmrc');
const line = `\n//npm.pkg.github.com/:_authToken=${token}\n`;
fs.appendFileSync(npmrcPath, line, 'utf8');
console.log('[vercel-install] Ligne auth ajoutée à .npmrc (longueur jeton:', token.length, 'caractères).');
