import { BigNumber } from 'bignumber.js';

import { TokenData, TransactionData } from 'src/components/Transactions/Types';
import { AllowedToken } from 'src/types/allowedTokens';
import { Offer } from 'src/types/offer/Offer';

export const associateTransactionWithOffer = (
  transactions: TransactionData[],
  createOfferTransactions: TransactionData[],
  offers: Offer[],
  allowedTokens?: AllowedToken[]
): {
  transactionsWithOffers: TransactionData[];
  createTransactionsWithOffers: TransactionData[];
} => {
  // Boucle à travers chaque transaction
  const transactionsWithOffers = transactions.map((transaction) => {
    // Trouve l'offre correspondante en utilisant offerId
    const correspondingOffer = offers.find(
      (offer) => offer.offerId === transaction.offerId
    );

    const tokenForSaleData = getTokenInfo(
      allowedTokens,
      correspondingOffer?.offerTokenAddress
    );

    const tokenBuyWithData = getTokenInfo(
      allowedTokens,
      correspondingOffer?.buyerTokenAddress
    );

    const tokenForSale: TokenData = {
      address: correspondingOffer?.offerTokenAddress ?? '?',
      decimals: parseInt(correspondingOffer?.offerTokenDecimals ?? '0'),
      name: correspondingOffer?.offerTokenName ?? '?',
      symbol: tokenForSaleData?.symbol,
      Logo: tokenForSaleData?.logo,
    };

    const tokenBuyWith: TokenData = {
      address: correspondingOffer?.buyerTokenAddress ?? '?',
      decimals: parseInt(correspondingOffer?.buyerTokenDecimals ?? '0'),
      name: correspondingOffer?.buyerTokenName ?? '?',
      symbol: tokenBuyWithData?.symbol,
      Logo: tokenBuyWithData?.logo,
    };

    if (transaction.tokenForSale) {
      const amount = new BigNumber(transaction.amountGwei).dividedBy(
        new BigNumber(10).pow(tokenForSale.decimals)
      );
      transaction.amount = amount.toNumber();
    }

    if (transaction.tokenBuyWith) {
      const price = new BigNumber(transaction.priceGwei).dividedBy(
        new BigNumber(10).pow(tokenBuyWith.decimals)
      );
      transaction.price = price.toNumber();
    }

    transaction.tokenForSale = tokenForSale;
    transaction.tokenBuyWith = tokenBuyWith;
    transaction.offerType = correspondingOffer?.type;
    transaction.offerTimestamp = correspondingOffer?.createdAtTimestamp;
    transaction.currentOfferAmount = correspondingOffer?.amount
      ? parseInt(correspondingOffer.amount)
      : undefined;

    // Ajoute l'offre correspondante à la transaction
    return {
      ...transaction,
    };
  });

  const createTransactionsWithOffers = createOfferTransactions.map(
    (createofferTransaction) => {
      // Trouve l'offre correspondante en utilisant offerId
      const correspondingOffer = offers.find(
        (offer) => offer.createdAtTimestamp === createofferTransaction.timeStamp
      );

      if (correspondingOffer)
        createofferTransaction.offerId = correspondingOffer.offerId;

      // Ajoute l'offre correspondante à la transaction
      return {
        ...createofferTransaction,
      };
    }
  );

  // Affiche le résultat dans la console
  // console.log(
  //   'Transactions avec offres correspondantes :',
  //   transactionsWithOffers
  // );

  return { transactionsWithOffers, createTransactionsWithOffers };
};

export const guessCreateOfferTransactionId = (
  transactions: TransactionData[],
  createOfferTransactions: TransactionData[]
): TransactionData[] => {
  const offerIds = new Set(createOfferTransactions.map((t) => t.offerId));

  // Boucle à travers chaque transaction
  const createOfferTransactionsWithId = createOfferTransactions.map(
    (createOfferTransaction) => {
      // Trouve l'offre correspondante en utilisant offerId
      const correspondingTransactions = transactions.filter((transaction) => {
        const transactionIniAmount = transaction.initialOfferAmountGwei
          ? transaction.initialOfferAmountGwei ===
            createOfferTransaction.initialOfferAmountGwei
          : true;

        return (
          transaction.blockNumber > createOfferTransaction.blockNumber &&
          transaction.priceGwei === createOfferTransaction.priceGwei &&
          transactionIniAmount
        );
      });

      const correspondingIdsSet = new Set(
        correspondingTransactions.map((c) => c.offerId)
      );

      offerIds.forEach((value) => {
        correspondingIdsSet.delete(value);
      });
      const correspondingIds = [...correspondingIdsSet];

      if (correspondingTransactions && correspondingIds.length === 1) {
        console.log(
          'CHAMPAGNE',
          correspondingIds[0],
          [...offerIds],
          createOfferTransaction.blockNumber
        );
        createOfferTransaction.offerId = correspondingIds[0];
        offerIds.add(createOfferTransaction.offerId);
      } else if (correspondingTransactions.length > 1) {
        console.log(
          'ALMOST CHAMPAGNE',
          correspondingIds,
          createOfferTransaction.blockNumber
        );
      }

      // Ajoute l'offre correspondante à la transaction
      return {
        ...createOfferTransaction,
      };
    }
  );

  // Affiche le résultat dans la console
  // console.log(
  //   'Transactions avec offres correspondantes :',
  //   transactionsWithOffers
  // );

  return createOfferTransactionsWithId;
};

export const associateBuyWithCreateOfferTransaction = (
  transactions: TransactionData[],
  createOfferTransactions: TransactionData[]
): TransactionData[] => {
  // Boucle à travers chaque transaction
  console.log(
    'createOfferTransactions'
    //JSON.stringify(createOfferTransactions, null, 4)
  );
  const transactionsWithInitData = transactions.map((transaction) => {
    // Trouve l'offre correspondante en utilisant offerId
    const correspondingTransaction = createOfferTransactions.find(
      (createOfferTransaction) =>
        createOfferTransaction.timeStamp === transaction.offerTimestamp
    );

    if (transaction.tokenForSale && correspondingTransaction) {
      const amount = new BigNumber(
        correspondingTransaction?.amountGwei
      ).dividedBy(new BigNumber(10).pow(transaction.tokenForSale.decimals));
      transaction.initialOfferAmount = amount.toNumber();
    } else {
      transaction.initialOfferAmount = correspondingTransaction?.amount;
    }
    if (correspondingTransaction) {
      correspondingTransaction.offerId = transaction.offerId;
    }

    // Ajoute l'offre correspondante à la transaction
    return {
      ...transaction,
    };
  });

  // Affiche le résultat dans la console
  // console.log(
  //   'Transactions avec offres correspondantes :',
  //   transactionsWithOffers
  // );

  return transactionsWithInitData;
};

export function getTokenInfo(
  allowedTokens: AllowedToken[] | undefined,
  tokenAddress: string | undefined
) {
  return allowedTokens && tokenAddress
    ? allowedTokens.find(
        (t) => t.contractAddress.toLowerCase() === tokenAddress.toLowerCase()
      )
    : undefined;
}

export function formatTimestamp(timestamp: number): string {
  // Convertir le timestamp en millisecondes en multipliant par 1000
  const date = new Date(timestamp * 1000);

  // Utiliser les méthodes de l'objet Date pour extraire les composants de la date
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const seconds = date.getSeconds().toString().padStart(2, '0');

  // Retourner la date formatée
  return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
}
export function formatTimestampDay(timestamp: number): string {
  // Convertir le timestamp en millisecondes en multipliant par 1000
  const date = new Date(timestamp * 1000);

  // Utiliser les méthodes de l'objet Date pour extraire les composants de la date
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');

  // Retourner la date formatée
  return `${day}/${month}/${year}`;
}
export function formatTimestampHour(timestamp: number): string {
  // Convertir le timestamp en millisecondes en multipliant par 1000
  const date = new Date(timestamp * 1000);

  // Utiliser les méthodes de l'objet Date pour extraire les composants de la date
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const seconds = date.getSeconds().toString().padStart(2, '0');

  // Retourner la date formatée
  return `${hours}:${minutes}:${seconds}`;
}
export function sumSpendingValues(transactions: TransactionData[]): number {
  return transactions.reduce((total, transaction) => {
    // console.log(
    //   'sumSpendingValues',
    //   new BigNumber(transaction.price).times(transaction.amount).toNumber()
    // );
    // if (transaction.blockNumber < 30280820) {
    //   console.log(
    //     'SUM T',
    //     transaction.blockNumber,
    //     transaction.price,
    //     transaction.amount,
    //     total
    //   );
    // }
    return new BigNumber(total)
      .plus(new BigNumber(transaction.price).times(transaction.amount))
      .toNumber();
  }, 0);
}

export function getTimestampRange(transactions: TransactionData[]): {
  firstTimestamp: number | undefined;
  lastTimestamp: number | undefined;
} {
  if (transactions.length === 0) {
    return { firstTimestamp: undefined, lastTimestamp: undefined };
  }

  const lastTimestamp = transactions[0].timeStamp;
  const firstTimestamp = transactions[transactions.length - 1].timeStamp;

  return { firstTimestamp, lastTimestamp };
}

export function calculateAverageExpense(
  transactions: TransactionData[]
): number | undefined {
  if (transactions.length === 0) {
    return undefined;
  }

  // Calcul de la somme des dépenses
  const totalExpense = transactions.reduce((acc, transaction) => {
    return acc + transaction.price * transaction.amount;
  }, 0);

  // Calcul de la dépense moyenne
  const averageExpense = totalExpense / transactions.length;

  return averageExpense;
}

export function calculateExpenseStandardDeviation(
  transactions: TransactionData[]
): number | undefined {
  // Calcul de la moyenne des dépenses
  const averageExpense = calculateAverageExpense(transactions);

  if (transactions.length === 0 || !averageExpense) {
    return undefined;
  }

  console.log(transactions.map((t) => t.price * t.amount));

  // Calcul de la somme des carrés des écarts par rapport à la moyenne
  const sumOfSquares = transactions.reduce((acc, transaction) => {
    const expense = new BigNumber(transaction.price).times(transaction.amount);
    const difference = expense.minus(averageExpense);
    const square = difference.pow(2);
    console.log(
      'SQUARE ',
      expense.toNumber(),
      difference.toNumber(),
      square.toNumber()
    );
    return acc.plus(square);
  }, new BigNumber(0));

  console.log('SUM ', sumOfSquares.toNumber());
  console.log(
    'SUM DIV',
    sumOfSquares.dividedBy(transactions.length).toNumber()
  );

  // Calcul de l'écart-type
  const standardDeviation = sumOfSquares
    .dividedBy(transactions.length)
    .sqrt()
    .toNumber();

  return standardDeviation;
}

export function calculateAverageExpensesPerDay(
  transactions: TransactionData[]
): Map<number, number> {
  const expensesPerDay = new Map<number, number>();
  const transactionsPerDay = new Map<number, TransactionData[]>();

  // Group transactions by day
  transactions.forEach((transaction) => {
    const dayTimestamp = Math.floor(transaction.timeStamp / 86400); // Convert to days
    if (!transactionsPerDay.has(dayTimestamp)) {
      transactionsPerDay.set(dayTimestamp, []);
    }
    transactionsPerDay.get(dayTimestamp)?.push(transaction);
  });

  // Calculate the sum of expenses per day
  transactionsPerDay.forEach((dailyTransactions) => {
    const dailyExpense = dailyTransactions.reduce(
      (totalExpense, transaction) =>
        totalExpense.plus(
          new BigNumber(transaction.price).times(transaction.amount)
        ),
      new BigNumber(0)
    );

    // Store the sum of expenses for each day
    expensesPerDay.set(
      Math.floor(dailyTransactions[0].timeStamp / 86400),
      dailyExpense.toNumber()
    );
  });

  return expensesPerDay;
}

export function calculateExpensesPer24Hours(
  transactions: TransactionData[],
  t0: number
): Map<number, number> {
  const expensesPer24Hours = new Map<number, number>();
  const transactionsPer24Hours = new Map<number, TransactionData[]>();

  // Group transactions by 24-hour periods
  transactions.forEach((transaction) => {
    const hoursSinceT0 = Math.floor((transaction.timeStamp - t0) / 3600); // Convert to hours since T0
    const periodIndex = Math.floor(hoursSinceT0 / 24); // Calculate the 24-hour period index

    if (!transactionsPer24Hours.has(periodIndex)) {
      transactionsPer24Hours.set(periodIndex, []);
    }
    transactionsPer24Hours.get(periodIndex)?.push(transaction);
  });

  // Calculate the sum of expenses per 24-hour period
  transactionsPer24Hours.forEach((dailyTransactions) => {
    const dailyExpense = dailyTransactions.reduce(
      (totalExpense, transaction) =>
        totalExpense.plus(
          new BigNumber(transaction.price).times(transaction.amount)
        ),
      new BigNumber(0)
    );

    const hoursSinceT0 = Math.floor(
      (dailyTransactions[0].timeStamp - t0) / 3600
    ); // Convert to hours since T0
    const periodIndex = Math.floor(hoursSinceT0 / 24); // Calculate the 24-hour period index

    // Store the sum of expenses for each 24-hour period
    expensesPer24Hours.set(periodIndex, dailyExpense.toNumber());
  });

  return expensesPer24Hours;
}

export function calculateTransactionsPer24Hours(
  transactions: TransactionData[],
  t0: number
): Map<number, number> {
  const numberOftransactionsPer24Hours = new Map<number, number>();
  const transactionsPer24Hours = new Map<number, TransactionData[]>();

  // Group transactions by 24-hour periods
  transactions.forEach((transaction) => {
    const hoursSinceT0 = Math.floor((transaction.timeStamp - t0) / 3600); // Convert to hours since T0
    const periodIndex = Math.floor(hoursSinceT0 / 24); // Calculate the 24-hour period index

    if (!transactionsPer24Hours.has(periodIndex)) {
      transactionsPer24Hours.set(periodIndex, []);
    }
    transactionsPer24Hours.get(periodIndex)?.push(transaction);
  });

  // Calculate the sum of expenses per 24-hour period
  transactionsPer24Hours.forEach((dailyTransactions) => {
    const dailytransactions = dailyTransactions.reduce(
      (totalTransactions) => totalTransactions.plus(1),
      new BigNumber(0)
    );

    const hoursSinceT0 = Math.floor(
      (dailyTransactions[0].timeStamp - t0) / 3600
    ); // Convert to hours since T0
    const periodIndex = Math.floor(hoursSinceT0 / 24); // Calculate the 24-hour period index

    // Store the sum of expenses for each 24-hour period
    numberOftransactionsPer24Hours.set(
      periodIndex,
      dailytransactions.toNumber()
    );
  });

  return numberOftransactionsPer24Hours;
}
