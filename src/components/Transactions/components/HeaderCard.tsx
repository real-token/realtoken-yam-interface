import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { Card, Grid, TextInput, createStyles } from '@mantine/core';

import { HeaderElement } from 'src/components/List/HeaderElement';
import { SortDirection } from 'src/components/List/Types';
import { useMantineTheme } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { Columns, mapColumnLabels } from '../utils/Types';

const useStyle = createStyles((theme) => ({
  card: {
    marginTop: '-1px',
    borderRadius: '10px 10px 0 0 ',
    backgroundColor:
      theme.colorScheme === 'dark' ? undefined : theme.colors.gray[1],
  },
}));

interface HeaderCardProps {
  filterText: string;
  selectedHeader: Columns | null;
  handleFilterChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSortChange: (sortDirection: SortDirection) => void;
  setSelectedHeader: (value: React.SetStateAction<Columns | null>) => void;
}

const HeaderCard: FC<HeaderCardProps> = ({
  filterText,
  selectedHeader,
  handleFilterChange,
  handleSortChange,
  setSelectedHeader,
}) => {
  const { classes } = useStyle();
  const { t } = useTranslation('transactions', { keyPrefix: 'list' });
  const columnLabels = mapColumnLabels(t);
  const theme = useMantineTheme();
  const isSmall = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);
  const isMobile = useMediaQuery(`(max-width: ${theme.breakpoints.xs})`);

  return (
    <Card
      withBorder={true}
      radius={0}
      className={classes.card}
      p={isMobile || isSmall ? 2 : 10}
    >
      <Grid columns={isMobile ? 9 : 13}>
        <Grid.Col span={3} p={12}>
          <TextInput
            fz={isMobile || isSmall ? 'xs' : 'md'}
            placeholder={t('search')}
            value={filterText}
            onChange={handleFilterChange}
            size={isMobile || isSmall ? 'xs' : 'sm'}
          />
        </Grid.Col>
        {Object.values(Columns)
          .filter(
            (c) =>
              !isMobile || (c !== Columns.offerId && c !== Columns.usdAmount),
          )
          .map((column, index) => (
            <Grid.Col key={index} span={2} p={isMobile ? 0 : undefined}>
              <HeaderElement
                label={columnLabels[column]}
                sortByColumn={(sortDirection: SortDirection) => {
                  handleSortChange(sortDirection);
                  console.log(column, sortDirection);
                }}
                selected={selectedHeader !== null && selectedHeader === column}
                setSelectedHeader={() => setSelectedHeader(column)}
                justify={'left'}
              ></HeaderElement>
            </Grid.Col>
          ))}
      </Grid>
    </Card>
  );
};

export default HeaderCard;
