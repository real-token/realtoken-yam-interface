import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

import BigNumber from 'bignumber.js';

import { Offer } from 'src/types/offer/Offer';
import { Transaction } from 'src/types/transaction/Transaction';
import { TRANSACTION_TYPE } from 'src/types/transaction/TransactionType';

import { Transaction as TransactionGraphQl } from '../../../.graphclient/index';
import { getTheGraphUrlRealtoken } from '../theGraph/getClientURL';
import { getTransactionQuery } from './getTransactionQuery';
import { parseTransaction } from './parseTransaction';

export const fetchTransactionsTheGraph = (
  chainId: number,
  offers: Offer[],
): Promise<Transaction[]> => {
  return new Promise<Transaction[]>(async (resolve, reject) => {
    try {
      const transactionsData: Transaction[] = [];

      const clientYAM = new ApolloClient({
        uri: getTheGraphUrlRealtoken(chainId),
        cache: new InMemoryCache(),
      });

      // Pagination
      const transactions: TransactionGraphQl[] = [];
      let skip = 0;
      let stop = false;
      while (!stop) {
        const { data } = await clientYAM.query({
          query: gql`
            query getTransactions {
              transactions(first: 1000, skip: ${skip}) {
                ${getTransactionQuery()}
              }
            }
          `,
        }); //, where: { removedAtBlock: null }) {

        if (data.transactions && data.transactions.length > 0) {
          skip += 1000;

          transactions.push(...data.transactions);

          // Avoid one request more
          if (data.transactions.length < 1000) stop = true;
        } else {
          stop = true;
        }
      }

      //console.log('Debug Query dataRealtoken', dataRealtoken);

      const promises = transactions.map(
        (transaction: TransactionGraphQl) =>
          new Promise<Transaction>(async (resolve, reject) => {
            try {
              const offerData: Transaction = await parseTransaction(
                transaction,
                offers,
              );

              resolve(offerData);
            } catch (err) {
              console.log('Error when parsingOffer: ', err);
              reject(err);
            }
          }),
      );

      const parsedTransactions = (await Promise.all(promises)).filter(
        (t) => t.type === TRANSACTION_TYPE.BUY,
      );

      console.log(
        'Query dataYAM transaction',
        parsedTransactions.length,
        JSON.stringify(parsedTransactions, null, 4),
        //parsedTransactions.map((t) => t.offerId)
      );

      transactionsData.push(...parsedTransactions);

      resolve(transactionsData);
    } catch (err) {
      console.log('Error while fetching offers from TheGraph', err);
      reject(err);
    }
  });
};
