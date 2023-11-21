import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { Card, Grid, TextInput, createStyles } from '@mantine/core';

import { HeaderElement } from 'src/components/List/HeaderElement';
import { SortDirection } from 'src/components/List/Types';

import { Columns, mapColumnLabels } from '../Types';

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
  return (
    <Card withBorder={true} radius={0} className={classes.card}>
      <Grid columns={15}>
        <Grid.Col span={3}>
          <TextInput
            placeholder={t('search')}
            value={filterText}
            onChange={handleFilterChange}
          />
        </Grid.Col>
        {Object.values(Columns).map((column, index) => (
          <Grid.Col key={index} span={2}>
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
