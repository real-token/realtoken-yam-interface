const LOG_PREFIX = '[dev-api-auth]';

const LOGIN_MUTATION = `
  mutation DevApiLogin($email: String!, $password: String!) {
    auth {
      login(email: $email, password: $password) {
        token
      }
    }
  }
`;

function trimEnv(value) {
  if (value == null || value === '') return undefined;
  const trimmed = String(value).trim();
  if (
    (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
    (trimmed.startsWith("'") && trimmed.endsWith("'"))
  ) {
    return trimmed.slice(1, -1);
  }
  return trimmed || undefined;
}

async function loginForToken(apiUrl, email, password) {
  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query: LOGIN_MUTATION,
      variables: { email, password },
    }),
  });

  if (!response.ok) {
    throw new Error(`HTTP ${response.status} ${response.statusText}`);
  }

  const json = await response.json();

  if (json.errors?.length) {
    const message = json.errors.map((e) => e.message).join('; ');
    throw new Error(message);
  }

  const token = json?.data?.auth?.login?.token;
  if (!token) {
    throw new Error('Réponse login sans token');
  }

  return token;
}

/**
 * Résout le Bearer JWT pour l’API GraphQL en dev local.
 * Priorité : login AUTH_USER/AUTH_PASSWORD → repli AUTH_TOKEN.
 * @param {Record<string, string>} env
 * @returns {Promise<string | undefined>}
 */
export async function resolveDevApiBearer(env) {
  const apiUrl = trimEnv(env.VITE_API_URL);
  const email = trimEnv(env.AUTH_USER);
  const password = trimEnv(env.AUTH_PASSWORD);
  const authToken = trimEnv(env.AUTH_TOKEN);

  if (email && password) {
    if (!apiUrl) {
      console.warn(
        `${LOG_PREFIX} AUTH_USER/AUTH_PASSWORD définis mais VITE_API_URL absent — repli AUTH_TOKEN`
      );
    } else {
      try {
        const token = await loginForToken(apiUrl, email, password);
        console.log(`${LOG_PREFIX} JWT obtenu via login (${email})`);
        return token;
      } catch (error) {
        console.warn(
          `${LOG_PREFIX} Login échoué, repli AUTH_TOKEN:`,
          error instanceof Error ? error.message : error
        );
      }
    }
  }

  if (authToken) {
    console.log(`${LOG_PREFIX} Utilisation de AUTH_TOKEN`);
    return authToken;
  }

  console.warn(
    `${LOG_PREFIX} Aucun Bearer configuré — requêtes API sans authentification (attendu si domaine WL)`
  );
  return undefined;
}
