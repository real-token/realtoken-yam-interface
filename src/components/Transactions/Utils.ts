import { TFunction } from 'react-i18next';

import { BigNumber } from 'bignumber.js';

import { Transaction } from 'src/types/transaction/Transaction';

export function sortTransactions(transactions: Transaction[]): Transaction[] {
  // Triez les transactions par ordre décroissant du champ timestamp
  const copiedTransactions = [...transactions];
  return copiedTransactions.sort((a, b) => b.timeStamp - a.timeStamp);
}

export function getFirstsTransactions(
  transactions: Transaction[],
  firsts: number
): Transaction[] {
  // Récupérez les 10 premières transactions après le tri
  const recentTransactions = transactions.slice(0, firsts);

  return recentTransactions;
}

export function getNextTransactions(
  transactions: Transaction[],
  lastTimestamp: number,
  firsts: number
): Transaction[] {
  // Trouvez l'index de la dernière transaction avec le timestamp donné
  const lastIndex = transactions.findIndex(
    (transaction) => transaction.timeStamp === lastTimestamp
  );

  // Récupérez les 10 transactions suivantes après le dernier index
  const nextTransactions = transactions.slice(
    lastIndex + 1,
    lastIndex + firsts + 1
  );

  return nextTransactions;
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
export function sumSpendingValues(transactions: Transaction[]): number {
  return transactions.reduce((total, transaction) => {
    return new BigNumber(total)
      .plus(new BigNumber(transaction.price).times(transaction.amount))
      .toNumber();
  }, 0);
}

export function sumAmountValues(transactions: Transaction[]): number {
  return transactions.reduce((total, transaction) => {
    return new BigNumber(total)
      .plus(new BigNumber(transaction.amount))
      .toNumber();
  }, 0);
}

export function getTimestampRange(transactions: Transaction[]): {
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
  transactions: Transaction[]
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

export function calculateAveragePrice(
  transactions: Transaction[]
): number | undefined {
  if (transactions.length === 0) {
    return undefined;
  }

  const totalAmount = sumAmountValues(transactions);

  // Calcul de la somme des dépenses
  const totalPrice = sumSpendingValues(transactions);

  // Calcul de la dépense moyenne
  const averagePrice = new BigNumber(totalPrice).dividedBy(totalAmount);

  return averagePrice.toNumber();
}

export function calculateExpenseStandardDeviation(
  transactions: Transaction[]
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
  transactions: Transaction[]
): Map<number, number> {
  const expensesPerDay = new Map<number, number>();
  const transactionsPerDay = new Map<number, Transaction[]>();

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
  transactions: Transaction[],
  t0: number,
  days = 7
): Map<number, number> {
  const expensesPer24Hours = new Map<number, number>();
  const transactionsPer24Hours = new Map<number, Transaction[]>();

  // Group transactions by 24-hour periods
  transactions.forEach((transaction) => {
    const hoursSinceT0 = Math.floor((transaction.timeStamp - t0) / 3600); // Convert to hours since T0
    const periodIndex = Math.floor(hoursSinceT0 / (24 * days)); // Calculate the 24-hour period index

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
    const periodIndex = Math.floor(hoursSinceT0 / (24 * days)); // Calculate the 24-hour period index

    // Store the sum of expenses for each 24-hour period
    expensesPer24Hours.set(periodIndex, dailyExpense.toNumber());
  });

  return expensesPer24Hours;
}

export function calculateTransactionsPerPeriod(
  transactions: Transaction[],
  t0: number,
  days = 7
): Map<number, number> {
  const numberOftransactionsPer24Hours = new Map<number, number>();
  const transactionsPer24Hours = new Map<number, Transaction[]>();

  // Group transactions by 24-hour periods
  transactions.forEach((transaction) => {
    const hoursSinceT0 = Math.floor((transaction.timeStamp - t0) / 3600); // Convert to hours since T0
    const periodIndex = Math.floor(hoursSinceT0 / (24 * days)); // Calculate the 24-hour period index

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
    const periodIndex = Math.floor(hoursSinceT0 / (24 * days)); // Calculate the 24-hour period index

    // Store the sum of expenses for each 24-hour period
    numberOftransactionsPer24Hours.set(
      periodIndex,
      dailytransactions.toNumber()
    );
  });

  return numberOftransactionsPer24Hours;
}

export function calculatePricesPerPeriod(
  transactions: Transaction[],
  t0: number,
  days = 7
): Map<number, number> {
  const pricesPer24Hours = new Map<number, number>();
  const transactionPricesPer24Hours = new Map<number, Transaction[]>();

  // Group transactions by 24-hour periods
  transactions.forEach((transaction) => {
    const hoursSinceT0 = Math.floor((transaction.timeStamp - t0) / 3600); // Convert to hours since T0
    const periodIndex = Math.floor(hoursSinceT0 / (24 * days)); // Calculate the 24-hour period index

    if (!transactionPricesPer24Hours.has(periodIndex)) {
      transactionPricesPer24Hours.set(periodIndex, []);
    }
    transactionPricesPer24Hours.get(periodIndex)?.push(transaction);
  });

  // Calculate the sum of expenses per 24-hour period
  transactionPricesPer24Hours.forEach((dailyTransactions) => {
    const dailyPrice = calculateAveragePrice(dailyTransactions);

    const hoursSinceT0 = Math.floor(
      (dailyTransactions[0].timeStamp - t0) / 3600
    ); // Convert to hours since T0
    const periodIndex = Math.floor(hoursSinceT0 / (24 * days)); // Calculate the 24-hour period index

    // Store the sum of expenses for each 24-hour period
    pricesPer24Hours.set(periodIndex, dailyPrice ?? 0);
  });

  return pricesPer24Hours;
}

export function countTransactionsOfLastDays(
  transactions: Transaction[],
  days: number
): number {
  // Obtenez la date d'aujourd'hui
  const currentDate = new Date();

  // Calculez la date d'il y a 'days' jours
  const numberOfDaysAgo = new Date();
  numberOfDaysAgo.setDate(currentDate.getDate() - days);

  // Filtrez les transactions qui sont survenues au cours des 'days' derniers jours
  const transactionsLastDays = transactions.filter(
    (transaction) =>
      transaction.timeStamp >=
      new BigNumber(numberOfDaysAgo.getTime()).dividedBy(1000).toNumber()
  );

  // Retournez le nombre de transactions dans la fenêtre temporelle spécifiée
  return transactionsLastDays.length;
}

export function formatPeriod(
  days: number,
  t: TFunction<'transactions', 'stats'>
): string {
  return days === 1 ? '24h' : days + ' ' + t('day') + 's';
}
