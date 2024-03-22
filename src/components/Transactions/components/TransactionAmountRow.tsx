import React from 'react';
import { CsmSvg } from 'src/assets/currency/Csm';
import {
  Card,
  Modal,
  Stack,
  Text,
  createStyles,
  Group,
  Title,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useMantineTheme } from '@mantine/core';

import { Transaction } from 'src/types/transaction/Transaction';
import { formatSmallToken, formatUsd } from 'src/utils/format';
import { formatTimestamp } from 'src/utils/format';

import {
  csmTokenAmount,
  usdAmount,
  csmTokenSymbol,
} from 'src/utils/transaction';
import { useTranslation } from 'react-i18next';
import TransactionDetail from './TransactionDetail';

const ROW_HEIGHT = 60;

const useStyles = createStyles((theme) => ({
  row: {
    //marginTop: '0px',
    //marginBottom: '20px',
    cursor: 'pointer',
    backgroundColor:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[4]
        : theme.colors.gray[0],
    '&:hover': {
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.colors.dark[8]
          : theme.colors.gray[1],
      cursor: 'pointer',
      borderColor: theme.colors.brand[5],
    },
  },
  lastRow: {
    marginTop: '0px',
    cursor: 'pointer',
    backgroundColor:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[6]
        : theme.colors.gray[0],
  },
}));

interface TransactionRowProps {
  transaction: Transaction;
  style: React.CSSProperties;
  isSmall?: boolean;
  height?: number;
}

const TransactionAmountRow: React.FC<TransactionRowProps> = ({
  transaction,
  style,
  isSmall = false,
  height = ROW_HEIGHT,
}) => {
  const { classes } = useStyles();
  const { t } = useTranslation('transactions', { keyPrefix: 'modal' });

  const theme = useMantineTheme();
  //const isSmall = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);
  //const isMobile = useMediaQuery(`(max-width: ${theme.breakpoints.xs})`);
  const [opened, { close, open }] = useDisclosure(false);

  if (!transaction) return null;

  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        size={'auto'}
        title={<Title order={2}>{t('title')}</Title>}
        centered={true}
      >
        <TransactionDetail
          transaction={transaction}
          hideButton={true}
        ></TransactionDetail>
      </Modal>
      <div style={style} onClick={open}>
        <Card
          withBorder={true}
          py={10}
          //mb={50}
          //radius={0}
          className={classes.row}
          sx={{ height: `${height + 1}px`, marginBottom: '20px' }}
          style={{}}
        >
          <Group position={'apart'} h={'100%'}>
            <Stack
              h={'100%'}
              align={'stretch'}
              justify={'space-between'}
              spacing={0}
            >
              <div>
                <Group spacing={5} p={0} m={0}>
                  <Text
                    p={0}
                    m={0}
                    fz={isSmall ? 'sm' : '19px'}
                    ta={'left'}
                    fw={500}
                    color={
                      theme.colorScheme === 'dark'
                        ? theme.colors.gray[0]
                        : undefined
                    }
                  >
                    {formatSmallToken(
                      csmTokenAmount(transaction),
                      '',
                      6,
                      false,
                    )}
                  </Text>

                  <Text
                    p={0}
                    fz={isSmall ? 'sm' : '19px'}
                    ta={'left'}
                    fw={500}
                    color={
                      theme.colorScheme === 'dark'
                        ? theme.colors.gray[3]
                        : undefined
                    }
                  >
                    {csmTokenSymbol(transaction)}
                  </Text>
                </Group>
              </div>
              <div>
                <Text
                  mt={isSmall ? '-5px' : 0}
                  fz={isSmall ? 'xs' : '14px'}
                  ta={'left'}
                  fw={500}
                  color={
                    theme.colorScheme === 'dark'
                      ? theme.colors.gray[5]
                      : 'dimmed'
                  }
                >
                  {'≈ ' + formatUsd(usdAmount(transaction))}
                </Text>
              </div>
            </Stack>
            <Stack
              h={'100%'}
              align={'flex-end'}
              justify={'space-between'}
              spacing={0}
            >
              {React.cloneElement(<CsmSvg />, { width: '24' })}
              <div>
                <Text
                  fz={isSmall ? 'xs' : '14px'}
                  ta={'left'}
                  fw={500}
                  color={
                    theme.colorScheme === 'dark'
                      ? theme.colors.gray[5]
                      : 'dimmed'
                  }
                >
                  {formatTimestamp(transaction.timeStamp)}
                </Text>
              </div>
            </Stack>
          </Group>
        </Card>
      </div>
    </>
  );
};

export default TransactionAmountRow;
