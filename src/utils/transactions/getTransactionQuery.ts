export const getTransactionQuery = (): string => {
  return `
  block
  id
  timestamp
  to
  transferEvents(first: 1) {
    amount
    sender
    token {
      address
      decimals
      fullName
      symbol
    }
  }
  input
    `;
};
