export const WHITLISTED_ON_ALL_ID_RULE = [130];

// Liste des tokenId pour lesquels aucune vérification WL n'est requise
export const TOKEN_ID_NO_WL_NEEDED = [100508];

// Vérifie si l'utilisateur possède un WL universel
export const isUniversalWhitelisted = (wlTokenId: number[]): boolean => {
  return wlTokenId.some((id) => WHITLISTED_ON_ALL_ID_RULE.includes(id));
};
