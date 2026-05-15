import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  fromPromise,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';

import { DEV_JWT_REFRESH_MAX_ATTEMPTS } from './devJwtAuthConstants';
import { isDevJwtAuthError } from './isDevJwtAuthError';

declare const __DEV_API_BEARER__: string;

const DEV_API_AUTH_REFRESH_PATH = '/__dev_api_auth/refresh';

function getInitialDevApiBearer(): string | undefined {
  if (!import.meta.env.DEV) return undefined;
  const bearer = __DEV_API_BEARER__?.trim();
  return bearer || undefined;
}

const devAuthEnabled = Boolean(getInitialDevApiBearer());

let devApiBearer = getInitialDevApiBearer();
let refreshInFlight: Promise<string | undefined> | null = null;

async function refreshDevApiBearer(): Promise<string | undefined> {
  if (refreshInFlight) {
    return refreshInFlight;
  }

  refreshInFlight = fetch(DEV_API_AUTH_REFRESH_PATH)
    .then(async (response) => {
      if (!response.ok) {
        return undefined;
      }
      const json = (await response.json()) as { token?: string };
      const token = json.token?.trim();
      if (token) {
        devApiBearer = token;
        return token;
      }
      return undefined;
    })
    .catch(() => undefined)
    .finally(() => {
      refreshInFlight = null;
    });

  return refreshInFlight;
}

export const apiUrl = import.meta.env.VITE_API_URL ?? undefined;
if (!apiUrl) {
  throw new Error('Missing "VITE_API_URL" var env');
}

const httpLink = createHttpLink({
  uri: apiUrl,
});

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      ...(devApiBearer ? { Authorization: `Bearer ${devApiBearer}` } : {}),
    },
  };
});

const errorLink = onError(
  ({ graphQLErrors, networkError, operation, forward }) => {
    if (!import.meta.env.DEV || !devAuthEnabled) {
      return;
    }

    if (!isDevJwtAuthError(graphQLErrors, networkError)) {
      return;
    }

    const attempt = operation.getContext().devJwtRefreshAttempt ?? 0;
    if (attempt >= DEV_JWT_REFRESH_MAX_ATTEMPTS) {
      console.warn(
        '[dev-api-auth] échec après 3 rafraîchissements JWT'
      );
      return;
    }

    return fromPromise(
      refreshDevApiBearer().then((token) => {
        if (!token) {
          throw new Error('[dev-api-auth] rafraîchissement JWT échoué');
        }
        operation.setContext({
          ...operation.getContext(),
          devJwtRefreshAttempt: attempt + 1,
        });
      })
    ).flatMap(() => forward(operation));
  }
);

export const apiClient = new ApolloClient({
  cache: new InMemoryCache(),
  link: errorLink.concat(authLink).concat(httpLink),
});
