import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation('transactions', { keyPrefix: 'list' });
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
        <Grid.Col span={2}>
          <div>{t('buyingDate')}</div>
        </Grid.Col>
        <Grid.Col span={2}>
          <div>{t('tokenAmount')}</div>
        </Grid.Col>
        <Grid.Col span={2}>
          <div>{t('usdAmount')}</div>
        </Grid.Col>
        <Grid.Col span={2}>
          <div>{t('offerDate')}</div>
        </Grid.Col>
        <Grid.Col span={2}>
          <div>{t('offerPrice')}</div>
        </Grid.Col>
        <Grid.Col span={2}>
          <div>{t('amountLeft')}</div>
        </Grid.Col>
      </Grid>
    </Card>
  );
};

export default HeaderCard;
