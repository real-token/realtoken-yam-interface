import React, { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { VariableSizeList as List } from 'react-window';

import {
  Card,
  Container,
  Grid,
  Group,
  NativeSelect,
  TextInput,
  useMantineTheme,
} from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';

import { useTypedOffers } from 'src/hooks/offers/useTypedOffers';
import { useAppSelector } from 'src/hooks/react-hooks';
import { selectPublicOffers } from 'src/store/features/interface/interfaceSelector';

import { HeaderElement } from './HeaderElement';
import { ItemElement } from './ItemElement';
import {
  Columns,
  MaxHeight,
  OfferData,
  SortDirection,
  columnLabels,
  mapOfferToOfferData,
} from './Types';

const ITEM_HEIGHT_MIN = 100;

export const MarketList: FC = () => {
  const theme = useMantineTheme();
  const [sortedColumn, setSortedColumn] = useState('');
  const isLarge = !useMediaQuery(`(max-width: ${theme.breakpoints.lg})`);
  const isMobile = useMediaQuery(`(max-width: ${theme.breakpoints.xs})`);
  const publicOffers = useAppSelector(selectPublicOffers);
  const { offers } = useTypedOffers(publicOffers);
  const offersData: OfferData[] = offers.map((offer) =>
    mapOfferToOfferData(offer)
  );

  console.log('OFFERS', JSON.stringify(offers, null, 4));

  const { t } = useTranslation('buy', { keyPrefix: 'list' });

  const [filterText, setFilterText] = useState('');
  const [sortedOffers, setSortedOffers] = useState(
    offersData.filter(filterByText(filterText))
  );
  useEffect(() => {
    const offersData: OfferData[] = offers.map((offer) =>
      mapOfferToOfferData(offer)
    );
    setSortedOffers(offersData.filter(filterByText(filterText)));
  }, [offers, filterText]);

  const [selectedHeader, setSelectedHeader] = useState<Columns | null>(null);

  const sortOffersByColumn = (
    column: keyof OfferData,
    sortDirection: SortDirection
  ) => {
    const sorted = [...sortedOffers];
    sorted.sort((a, b) => {
      const columnA = a[column];
      const columnB = b[column];

      if (typeof columnA === 'number' && typeof columnB === 'number') {
        if (sortDirection === SortDirection.Asc) {
          return columnA - columnB;
        } else {
          return columnB - columnA;
        }
      }

      if (sortDirection === SortDirection.Asc) {
        return String(columnA).localeCompare(String(columnB));
      } else {
        return String(columnB).localeCompare(String(columnA));
      }
    });
    setSortedOffers(sorted);
  };

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilterText(event.target.value);
  };

  const renderItem = ({ index }: { index: number }) => {
    const offer = sortedOffers[index];
    const isLastItem = index === sortedOffers.length - 1;

    return <ItemElement offer={offer} isLastItem={isLastItem}></ItemElement>;
  };

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedColumn = event.target.value;

    // Update the value of sortedColumn
    setSortedColumn(selectedColumn);

    // Call the sort function based on the selected column
    for (const key in columnLabels) {
      if (t(columnLabels[key]) === selectedColumn) {
        sortOffersByColumn(key as keyof OfferData, SortDirection.Asc);
        break;
      }
    }
  };

  const itemHeight = isMobile
    ? MaxHeight.Mobile
    : isLarge
    ? MaxHeight.Large
    : MaxHeight.Medium;

  return (
    <Container
      style={{
        maxWidth: 'none',
        width: '100%',
        margin: 0,
        padding: 0,
      }}
    >
      <Card
        withBorder={true}
        radius={0}
        style={{
          marginTop: '-1px',
          borderRadius: '10px 10px 0 0 ',
          backgroundColor:
            theme.colorScheme === 'dark' ? undefined : theme.colors.gray[1],
        }}
      >
        {!isLarge && (
          <Group position={'apart'}>
            <TextInput
              placeholder={t('Search for offers...')}
              value={filterText}
              onChange={handleFilterChange}
            />
            <NativeSelect
              value={sortedColumn}
              onChange={handleSortChange}
              iconWidth={70}
              placeholder={t('Sort by: ')}
              icon={t('Sort by: ')}
              data={[
                t(columnLabels[Columns.sellerName]),
                t(columnLabels[Columns.requestedSellingPrice]),
                t(columnLabels[Columns.purchaseToken]),
                t(columnLabels[Columns.quantityAvailable]),
              ]}
            />
          </Group>
        )}
        {isLarge && (
          <Grid columns={20}>
            <Grid.Col xl={4} lg={5}>
              <TextInput
                placeholder={t('Search for offers...')}
                value={filterText}
                onChange={handleFilterChange}
              />
            </Grid.Col>
            <Grid.Col xl={4} lg={4}>
              <div>{''}</div>
            </Grid.Col>
            {Object.values(Columns).map((column, index) => (
              <Grid.Col key={index} xl={3} lg={index === 0 ? 2 : 3}>
                <HeaderElement
                  label={t(columnLabels[column])}
                  sortOffersByColumn={(sortDirection: SortDirection) =>
                    sortOffersByColumn(column, sortDirection)
                  }
                  selected={
                    selectedHeader !== null && selectedHeader === column
                  }
                  setSelectedHeader={() => setSelectedHeader(column)}
                ></HeaderElement>
              </Grid.Col>
            ))}
          </Grid>
        )}
      </Card>

      <List
        height={sortedOffers.length * itemHeight}
        itemCount={sortedOffers.length}
        itemSize={() => ITEM_HEIGHT_MIN}
        width={'100%'}
      >
        {renderItem}
      </List>
    </Container>
  );
};
function filterByText(
  filterText: string
): (value: OfferData, index: number, array: OfferData[]) => unknown {
  return (offer) => {
    const searchTerms = filterText.toLowerCase();
    return (
      offer.siteLocation.toLowerCase().includes(searchTerms) ||
      offer.forSaleToken.toLowerCase().includes(searchTerms)
    );
  };
}
