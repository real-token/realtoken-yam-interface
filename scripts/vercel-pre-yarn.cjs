/**
 * Runs on Vercel before `yarn install`: appends GitHub Packages auth to .npmrc.
 * Logs only non-secret diagnostics (token length, not value).
 */
const { execFileSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const token = (process.env.NODE_AUTH_TOKEN || process.env.NPM_TOKEN || '')
  .toString()
  .trim();

// #region agent log
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

// #region agent log
try {
  const who = execFileSync(
    'npm',
    ['whoami', '--registry', 'https://npm.pkg.github.com'],
    { encoding: 'utf8', cwd: process.cwd(), timeout: 20000, maxBuffer: 1024 * 1024 },
  ).trim();
  console.log(
    '[vercel-install]',
    JSON.stringify({
      sessionId: '2a5f23',
      hypothesisId: 'H9-registry-auth',
      message: 'npm whoami (GitHub Packages)',
      data: { ok: true, user: who },
      timestamp: Date.now(),
    }),
  );
} catch (e) {
  const stderr = (e.stderr && e.stderr.toString()) || '';
  console.log(
    '[vercel-install]',
    JSON.stringify({
      sessionId: '2a5f23',
      hypothesisId: 'H9-registry-auth',
      message: 'npm whoami (GitHub Packages)',
      data: { ok: false, stderrTail: stderr.slice(-500) },
      timestamp: Date.now(),
    }),
  );
}
// #endregion
