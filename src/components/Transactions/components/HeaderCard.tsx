import React, { FC } from 'react';

import { Card, Grid, TextInput, createStyles } from '@mantine/core';

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
  handleFilterChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const HeaderCard: FC<HeaderCardProps> = ({
  filterText,
  handleFilterChange,
}) => {
  const { classes } = useStyle();

  return (
    <Card withBorder={true} radius={0} className={classes.card}>
      <Grid columns={18}>
        <Grid.Col span={3}>
          <TextInput
            placeholder={'search'}
            value={filterText}
            onChange={handleFilterChange}
          />
        </Grid.Col>
        <Grid.Col span={2}>
          <div>{'Date achat'}</div>
        </Grid.Col>
        <Grid.Col span={2}>
          <div>{'Quantité'}</div>
        </Grid.Col>
        <Grid.Col span={2}>
          <div>{'Dépensé'}</div>
        </Grid.Col>
        <Grid.Col span={3}>
          <div>{'Transaction'}</div>
        </Grid.Col>
        <Grid.Col span={2}>
          <div>{'Création offre'}</div>
        </Grid.Col>
        <Grid.Col span={2}>
          <div>{'Prix'}</div>
        </Grid.Col>
        <Grid.Col span={2}>
          <div>{'Quantité restante'}</div>
        </Grid.Col>
      </Grid>
    </Card>
  );
};

export default HeaderCard;
