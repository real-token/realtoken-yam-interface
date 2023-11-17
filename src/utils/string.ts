export function truncateHash(input: string): string {
  if (input.length <= 12) {
    return input; // Renvoie la chaîne telle quelle si elle est courte
  }

  const prefix = input.slice(0, 5);
  const suffix = input.slice(-4);

  return `${prefix}...${suffix}`;
}
