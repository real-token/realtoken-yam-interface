import React from 'react';
import { IconCurrencyDollar } from '@tabler/icons';

import {
  ScrollArea,
  Accordion,
  rem,
  useMantineTheme,
  Text,
  Avatar,
  Group,
} from '@mantine/core';

import { OfferTransactionList } from 'src/components/Transactions/usecases/OfferTransactionList';

interface TransactionViewProps {
  offerId: string;
  isSmall?: boolean;
}

export const TransactionView: React.FC<TransactionViewProps> = ({
  offerId,
  isSmall = false,
}) => {
  return (
    <ScrollArea h={'100%'} type={'never'}>
      <OfferTransactionList
        offerId={offerId}
        isSmall={isSmall}
      ></OfferTransactionList>
    </ScrollArea>
  );
};

export default TransactionView;

export const TransactionViewAccordion: React.FC<TransactionViewProps> = ({
  offerId,
  isSmall = true,
}) => {
  const theme = useMantineTheme();
  const controlBackgroundColor =
    theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[0];
  const contentBorderColor =
    theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2];
  const contentBackgroundColor =
    theme.colorScheme === 'dark' ? theme.colors.dark[7] : 'white';

  return (
    <Accordion
      defaultValue={''}
      styles={{
        item: {
          backgroundColor: contentBackgroundColor,
          // styles added to all items
          border: `${rem(1)} solid ${contentBorderColor}`,
          borderRadius: '8px',
          // styles added to expanded item
          '&[data-active]': {
            //backgroundColor: '#ccc',
          },
        },
        control: {
          padding: '10px 10px 10px 15px',
          border: `${rem(theme.colorScheme === 'dark' ? 0 : 0)} solid ${theme.colors.gray[2]}`,
          color:
            theme.colorScheme === 'dark'
              ? theme.colors.gray[0]
              : theme.colors.gray[9],
          backgroundColor: controlBackgroundColor,
          borderRadius: '6px',
        },
        content: {
          padding: rem(16),

          // styles added to content wrapper
          '&[data-state="closed"]': {
            // styles added to content wrapper when item is closed
            //display: 'none',
          },
        },

        label: {
          padding: 0,
        },

        chevron: {
          transform: 'rotate(270deg)',
          // styles added to chevron when it should rotate
          '&[data-rotate]': {
            //transform: 'rotate(-90deg)',
          },
        },
      }}
    >
      <Accordion.Item value={'transactions'}>
        <Accordion.Control>
          {
            <Group spacing={10}>
              <Avatar
                color={'gray'}
                size={'28px'}
                radius={'xl'}
                variant={'filled'}
                styles={{
                  placeholder: {
                    backgroundColor:
                      theme.colorScheme === 'dark'
                        ? theme.colors.gray[7]
                        : theme.colors.gray[4],
                  },
                }}
              >
                <IconCurrencyDollar size={'1.5rem'} />
              </Avatar>
              <Text fw={500} fz={'15px'} m={0} p={0}>
                {'Transactions'}
              </Text>
            </Group>
          }
        </Accordion.Control>
        <Accordion.Panel>
          <TransactionView
            offerId={offerId}
            isSmall={isSmall}
          ></TransactionView>
        </Accordion.Panel>
      </Accordion.Item>
    </Accordion>
  );
};
