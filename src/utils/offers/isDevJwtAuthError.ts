const AUTH_ERROR_CODES = new Set([
  'UNAUTHENTICATED',
  'UNAUTHORIZED',
  'FORBIDDEN',
]);

/** JWT expiré : l’API renvoie souvent ce texte avec code DOWNSTREAM_SERVICE_ERROR. */
const AUTH_MESSAGE_PATTERN =
  /jwt|expired|unauthorized|invalid[^\n]{0,120}token|authentication\s+token|token\s+expired/i;

function messageMatchesAuthError(message: string | undefined): boolean {
  return Boolean(message && AUTH_MESSAGE_PATTERN.test(message));
}

type GraphQLErrorLike = {
  message?: string;
  extensions?: { code?: string };
};

type NetworkErrorLike = {
  statusCode?: number;
  message?: string;
};

export function isDevJwtAuthError(
  graphQLErrors?: readonly GraphQLErrorLike[] | null,
  networkError?: NetworkErrorLike | null
): boolean {
  if (networkError?.statusCode === 401) {
    return true;
  }

  if (messageMatchesAuthError(networkError?.message)) {
    return true;
  }

  if (!graphQLErrors?.length) {
    return false;
  }

  return graphQLErrors.some((error) => {
    const code = error.extensions?.code;
    if (code && AUTH_ERROR_CODES.has(code)) {
      return true;
    }
    return messageMatchesAuthError(error.message);
  });
}
