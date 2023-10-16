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

import { useAtomValue } from 'jotai';

import { useTypedOffers } from 'src/hooks/offers/useTypedOffers';
import { useAppSelector } from 'src/hooks/react-hooks';
import { tableOfferTypeAtom } from 'src/states';
import { selectPublicOffers } from 'src/store/features/interface/interfaceSelector';

import { HeaderElement } from './HeaderElement';
import { ItemElement, ItemEmptyElement } from './ItemElement';
import { Columns, MaxHeight, OfferData, SortDirection } from './Types';
import { mapColumnLabels, mapOfferToOfferData } from './Utils';

const ITEM_HEIGHT_MIN = 100;

export const MarketList: FC = () => {
  const theme = useMantineTheme();
  const tableOfferType = useAtomValue(tableOfferTypeAtom);
  const [sortedColumn, setSortedColumn] = useState('');
  const isLarge = !useMediaQuery(`(max-width: ${theme.breakpoints.lg})`);
  const isMobile = useMediaQuery(`(max-width: ${theme.breakpoints.xs})`);
  const publicOffers = useAppSelector(selectPublicOffers);
  const { offers } = useTypedOffers(publicOffers);
  const offersData: OfferData[] = offers.map((offer) =>
    mapOfferToOfferData(offer)
  );

  const { t } = useTranslation('buy', { keyPrefix: 'list' });
  const columnLabels = mapColumnLabels(tableOfferType, t);

  console.log('OFFERS', JSON.stringify(offers, null, 4));

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
    if (sortedOffers.length === 0) {
      return <ItemEmptyElement></ItemEmptyElement>;
    } else {
      return <ItemElement offer={offer} isLastItem={isLastItem}></ItemElement>;
    }
  };

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedColumn = event.target.value;

    // Update the value of sortedColumn
    setSortedColumn(selectedColumn);

    // Call the sort function based on the selected column
    for (const key in columnLabels) {
      if (columnLabels[key] === selectedColumn) {
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
        {isMobile && (
          <div>
            <TextInput
              placeholder={t('search')}
              value={filterText}
              onChange={handleFilterChange}
              sx={{ marginBottom: '10px' }}
            />
            <NativeSelect
              value={sortedColumn}
              onChange={handleSortChange}
              iconWidth={70}
              icon={t('sortBy')}
              data={[
                columnLabels[Columns.sellerName],
                columnLabels[Columns.requestedSellingPrice],
                columnLabels[Columns.purchaseToken],
                columnLabels[Columns.quantityAvailable],
              ]}
            />
          </div>
        )}
        {!isLarge && !isMobile && (
          <Group position={'apart'}>
            <TextInput
              placeholder={t('search')}
              value={filterText}
              onChange={handleFilterChange}
            />
            <NativeSelect
              value={sortedColumn}
              onChange={handleSortChange}
              iconWidth={70}
              icon={t('sortBy')}
              data={[
                columnLabels[Columns.sellerName],
                columnLabels[Columns.requestedSellingPrice],
                columnLabels[Columns.purchaseToken],
                columnLabels[Columns.quantityAvailable],
              ]}
            />
          </Group>
        )}
        {isLarge && (
          <Grid columns={20}>
            <Grid.Col xl={4} lg={5}>
              <TextInput
                placeholder={t('search')}
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
                  label={columnLabels[column]}
                  description={
                    column === Columns.requestedSellingPrice
                      ? t('perToken')
                      : undefined
                  }
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
        height={Math.max(sortedOffers.length, 1) * itemHeight}
        itemCount={Math.max(sortedOffers.length, 1)}
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
