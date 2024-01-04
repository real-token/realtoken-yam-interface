import React, { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { VariableSizeList as List } from 'react-window';

import {
  Card,
  Container,
  Grid,
  Group,
  Loader,
  NativeSelect,
  TextInput,
  useMantineTheme,
} from '@mantine/core';
import { useViewportSize } from '@mantine/hooks';

import { useAtomValue } from 'jotai';

import { useAllowedTokens } from 'src/hooks/useAllowedTokens';
import { tableOfferTypeAtom } from 'src/states';
import { OFFER_TYPE } from 'src/types/offer';
import { Offer } from 'src/types/offer/Offer';

import { HeaderElement } from '../../List/HeaderElement';
import {
  Columns,
  OfferData,
  SCREEN_SIZE,
  SortDirection,
  getRowHeight,
  getScreenSize,
} from './Types';
import { mapColumnLabels, mapOfferToOfferData } from './Utils';
import { ItemElement, ItemEmptyElement } from './components/ItemElement';

const ITEM_HEIGHT_MIN = 100;

interface MarketListProps {
  offers: Offer[];
}

export const MarketList: FC<MarketListProps> = ({ offers }) => {
  const theme = useMantineTheme();
  const listOfferType = useAtomValue(tableOfferTypeAtom);

  const [sortedColumn, setSortedColumn] = useState('');
  const { width } = useViewportSize();
  const screenSize = getScreenSize(width);
  const rowHeight = getRowHeight(screenSize);
  const { allowedTokens } = useAllowedTokens();
  const offersData: OfferData[] = offers.map((offer) =>
    mapOfferToOfferData(offer, listOfferType, allowedTokens)
  );
  const { t: tList } = useTranslation('list');
  const { t: tOfferMode } = useTranslation(listOfferType.toLowerCase(), {
    keyPrefix: 'list',
  });
  const columnLabels = mapColumnLabels(tOfferMode);
  const [filterText, setFilterText] = useState('');
  const [sortedOffers, setSortedOffers] = useState(
    offersData.filter(filterByText(filterText))
  );
  const [selectedHeader, setSelectedHeader] = useState<Columns | null>(null);

  const sortOffersByColumn = (
    column: keyof OfferData,
    sortDirection: SortDirection
  ) => {
    const sorted = [...sortedOffers];
    sorted.sort(sortColumn(column, sortDirection));
    setSortedOffers(sorted);
  };

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilterText(event.target.value);
  };

  useEffect(() => {
    const offersData: OfferData[] = offers
      .map((offer) => mapOfferToOfferData(offer, listOfferType, allowedTokens))
      .sort(sortColumn(Columns.createdAt, SortDirection.Desc));
    setSortedOffers(offersData.filter(filterByText(filterText)));
  }, [offers, filterText, allowedTokens, listOfferType]);

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
        const direction: SortDirection =
          (key === Columns.requestedPrice || key === Columns.createdAt) &&
          listOfferType === OFFER_TYPE.BUY
            ? SortDirection.Desc
            : SortDirection.Asc;
        //console.log('SORT direction', key, listOfferType, direction);
        sortOffersByColumn(key as keyof OfferData, direction);
        break;
      }
    }
  };

  const isMediumOrSmall =
    screenSize === SCREEN_SIZE.Medium || screenSize === SCREEN_SIZE.Small;

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
        {screenSize === SCREEN_SIZE.Mobile && (
          <div>
            <TextInput
              placeholder={tList('search')}
              value={filterText}
              onChange={handleFilterChange}
              sx={{ marginBottom: '10px' }}
            />
            <NativeSelect
              value={sortedColumn}
              onChange={handleSortChange}
              iconWidth={70}
              icon={tList('sortBy')}
              data={[
                columnLabels[Columns.requesterName],
                columnLabels[Columns.requestedPrice],
                columnLabels[Columns.createdAt],
                columnLabels[Columns.requestedAmount],
              ]}
            />
          </div>
        )}
        {isMediumOrSmall && (
          <Group position={'apart'}>
            <TextInput
              placeholder={tList('search')}
              value={filterText}
              onChange={handleFilterChange}
            />
            <NativeSelect
              value={sortedColumn}
              onChange={handleSortChange}
              iconWidth={70}
              icon={tList('sortBy')}
              data={[
                columnLabels[Columns.requesterName],
                columnLabels[Columns.requestedPrice],
                columnLabels[Columns.createdAt],
                columnLabels[Columns.requestedAmount],
              ]}
            />
          </Group>
        )}
        {screenSize === SCREEN_SIZE.Large && (
          <Grid columns={20}>
            <Grid.Col xl={4} lg={5}>
              <TextInput
                placeholder={tList('search')}
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
                    column === Columns.requestedPrice
                      ? tList('perToken')
                      : undefined
                  }
                  sortByColumn={(sortDirection: SortDirection) =>
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
        height={Math.max(sortedOffers.length, 1) * rowHeight}
        itemCount={Math.max(sortedOffers.length, 1)}
        itemSize={() => ITEM_HEIGHT_MIN}
        width={'100%'}
      >
        {renderItem}
      </List>
      {sortedOffers.length > 0 && sortedOffers[0].id === '' && (
        <Group position={'center'}>
          <Loader variant={'dots'} />
        </Group>
      )}
    </Container>
  );
};
function sortColumn(
  column: keyof OfferData,
  sortDirection: SortDirection
): ((a: OfferData, b: OfferData) => number) | undefined {
  //console.log('Sort', column, sortDirection);
  return (a, b) => {
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
  };
}

function filterByText(
  filterText: string
): (value: OfferData, index: number, array: OfferData[]) => unknown {
  return (offer) => {
    const searchTerms = filterText.toLowerCase();
    return (
      offer.sites.requested.aera.toLowerCase().includes(searchTerms) ||
      offer.sites.requested.country.toLowerCase().includes(searchTerms) ||
      offer.sites.requested.name.toLowerCase().includes(searchTerms) ||
      offer.sites.requested.energy
        .join(',')
        .toLowerCase()
        .includes(searchTerms) ||
      offer.sites.transfered.aera.toLowerCase().includes(searchTerms) ||
      offer.sites.transfered.country.toLowerCase().includes(searchTerms) ||
      offer.sites.transfered.name.toLowerCase().includes(searchTerms) ||
      offer.sites.transfered.energy
        .join(',')
        .toLowerCase()
        .includes(searchTerms) ||
      offer.transferedToken.toLowerCase().includes(searchTerms) ||
      offer.id.toLowerCase().includes(searchTerms)
    );
  };
}
