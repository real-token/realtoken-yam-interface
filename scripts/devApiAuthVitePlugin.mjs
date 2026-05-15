import { resolveDevApiBearer } from './resolveDevApiBearer.mjs';

const LOG_PREFIX = '[dev-api-auth]';
const REFRESH_PATH = '/__dev_api_auth/refresh';

/**
 * Middleware Vite dev : rafraîchit le JWT via AUTH_* (côté serveur).
 * @param {Record<string, string>} envForAuth
 */
export function devApiAuthVitePlugin(envForAuth) {
  let refreshCount = 0;

  return {
    name: 'dev-api-auth',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const url = req.url?.split('?')[0];
        if (url !== REFRESH_PATH) {
          return next();
        }

        if (req.method !== 'GET') {
          res.statusCode = 405;
          res.end('Method Not Allowed');
          return;
        }

        try {
          const token = await resolveDevApiBearer(envForAuth);
          if (!token) {
            res.statusCode = 401;
            res.setHeader('Content-Type', 'application/json');
            res.end(
              JSON.stringify({ error: 'Impossible de rafraîchir le JWT' })
            );
            return;
          }

          refreshCount += 1;
          console.log(
            `${LOG_PREFIX} JWT rafraîchi (tentative ${refreshCount})`
          );
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ token }));
        } catch (error) {
          res.statusCode = 500;
          res.setHeader('Content-Type', 'application/json');
          res.end(
            JSON.stringify({
              error: error instanceof Error ? error.message : String(error),
            })
          );
        }
      });
    },
  };
}
