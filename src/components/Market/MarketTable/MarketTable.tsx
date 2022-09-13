import { useState } from 'react';

import {
  Center,
  Group,
  ScrollArea,
  Table,
  Text,
  TextInput,
  UnstyledButton,
  createStyles,
} from '@mantine/core';
import { keys } from '@mantine/utils';
import {
  IconChevronDown,
  IconChevronUp,
  IconSearch,
  IconSelector,
} from '@tabler/icons';

import { Offer } from 'src/hooks/types';

const useStyles = createStyles((theme) => ({
  th: {
    padding: '0 !important',
  },

  control: {
    width: '100%',
    padding: `${theme.spacing.xs}px ${theme.spacing.md}px`,

    '&:hover': {
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
    },
  },

  icon: {
    width: 21,
    height: 21,
    borderRadius: 21,
  },
}));

interface TableSortProps {
  data: Offer[];
}

interface ThProps {
  children: React.ReactNode;
  reversed: boolean;
  sorted: boolean;
  onSort(): void;
}

function Th({ children, reversed, sorted, onSort }: ThProps) {
  const { classes } = useStyles();
  const Icon = sorted
    ? reversed
      ? IconChevronUp
      : IconChevronDown
    : IconSelector;
  return (
    <th className={classes.th}>
      <UnstyledButton onClick={onSort} className={classes.control}>
        <Group position='apart'>
          <Text weight={500} size='sm'>
            {children}
          </Text>
          <Center className={classes.icon}>
            <Icon size={14} stroke={1.5} />
          </Center>
        </Group>
      </UnstyledButton>
    </th>
  );
}

function filterData(data: Offer[], search: string) {
  const query = search.toLowerCase().trim();
  return data.filter((item) =>
    keys(data[0]).some((key) => item[key].toLowerCase().includes(query))
  );
}

function sortData(
  data: Offer[],
  payload: { sortBy: keyof Offer | null; reversed: boolean; search: string }
) {
  const { sortBy } = payload;

  if (!sortBy) {
    return filterData(data, payload.search);
  }

  return filterData(
    [...data].sort((a, b) => {
      if (payload.reversed) {
        return b[sortBy].localeCompare(a[sortBy]);
      }

      return a[sortBy].localeCompare(b[sortBy]);
    }),
    payload.search
  );
}

export function MarketTable({ data }: TableSortProps) {
  const [search, setSearch] = useState('');
  const [sortedData, setSortedData] = useState(data);
  const [sortBy, setSortBy] = useState<keyof Offer | null>(null);
  const [reverseSortDirection, setReverseSortDirection] = useState(false);

  const setSorting = (field: keyof Offer) => {
    const reversed = field === sortBy ? !reverseSortDirection : false;
    setReverseSortDirection(reversed);
    setSortBy(field);
    setSortedData(sortData(data, { sortBy: field, reversed, search }));
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;
    setSearch(value);
    setSortedData(
      sortData(data, { sortBy, reversed: reverseSortDirection, search: value })
    );
  };

  const rows = sortedData.map((row) => (
    <tr key={row.offerId}>
      <td>{row.offerId}</td>
      <td>{row.offerTokenName}</td>
      <td>{row.buyerTokenName}</td>
      <td>{row.price}</td>
      <td>{row.amount}</td>
    </tr>
  ));
  console.log('sorted data', sortedData);

  return (
    <ScrollArea>
      <TextInput
        placeholder='Search by any field'
        mb='md'
        icon={<IconSearch size={14} stroke={1.5} />}
        value={search}
        onChange={handleSearchChange}
      />
      <Table
        horizontalSpacing='md'
        verticalSpacing='xs'
        sx={{ tableLayout: 'fixed', minWidth: 700 }}
      >
        <thead>
          <tr>
            <Th
              sorted={sortBy === 'offerId'}
              reversed={reverseSortDirection}
              onSort={() => setSorting('offerId')}
            >
              offerId
            </Th>
            <Th
              sorted={sortBy === 'offerTokenName'}
              reversed={reverseSortDirection}
              onSort={() => setSorting('offerTokenName')}
            >
              offerTokenName
            </Th>
            <Th
              sorted={sortBy === 'buyerTokenName'}
              reversed={reverseSortDirection}
              onSort={() => setSorting('buyerTokenName')}
            >
              buyerTokenName
            </Th>
            <Th
              sorted={sortBy === 'price'}
              reversed={reverseSortDirection}
              onSort={() => setSorting('price')}
            >
              Price
            </Th>
            <Th
              sorted={sortBy === 'amount'}
              reversed={reverseSortDirection}
              onSort={() => setSorting('amount')}
            >
              Amount
            </Th>
          </tr>
        </thead>
        <tbody>
          {rows.length > 0 ? (
            rows
          ) : (
            <tr>
              <td colSpan={Object.keys(data[0]).length}>
                <Text weight={500} align='center'>
                  Nothing found
                </Text>
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </ScrollArea>
  );
}
