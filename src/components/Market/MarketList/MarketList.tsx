import React, { FC, useEffect, useState } from 'react';
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
  HeaderElementId,
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

  console.log('OFFERS', offers.length, offersData.length);
  console.log('OFFERS', JSON.stringify(offersData, null, 4));

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

  const [selectedHeader, setSelectedHeader] = useState<HeaderElementId | null>(
    null
  );

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

    // Mettez à jour la valeur de sortedColumn
    setSortedColumn(selectedColumn);

    // Appelez la fonction de tri en fonction de la colonne sélectionnée
    if (selectedColumn === columnLabels[Columns.sellerName]) {
      sortOffersByColumn(Columns.sellerName, SortDirection.Asc);
    } else if (selectedColumn === columnLabels[Columns.requestedSellingPrice]) {
      sortOffersByColumn(Columns.requestedSellingPrice, SortDirection.Asc);
    } else if (selectedColumn === columnLabels[Columns.purchaseToken]) {
      sortOffersByColumn(Columns.purchaseToken, SortDirection.Asc);
    } else if (selectedColumn === columnLabels[Columns.quantityAvailable]) {
      sortOffersByColumn(Columns.quantityAvailable, SortDirection.Asc);
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
              placeholder={'Search for offers...'}
              value={filterText}
              onChange={handleFilterChange}
            />
            <NativeSelect
              value={sortedColumn}
              onChange={handleSortChange}
              iconWidth={70}
              placeholder={'sort'}
              icon={'Sort by: '}
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
                placeholder={'Search for offers...'}
                value={filterText}
                onChange={handleFilterChange}
              />
            </Grid.Col>
            <Grid.Col xl={4} lg={4}>
              <div>{''}</div>
            </Grid.Col>
            <Grid.Col xl={3} lg={2}>
              <HeaderElement
                label={columnLabels[Columns.sellerName]}
                sortOffersByColumn={(sortDirection: SortDirection) =>
                  sortOffersByColumn(Columns.sellerName, sortDirection)
                }
                selected={selectedHeader === HeaderElementId.Seller}
                setSelectedHeader={() =>
                  setSelectedHeader(HeaderElementId.Seller)
                }
              ></HeaderElement>
            </Grid.Col>
            <Grid.Col xl={3} lg={3}>
              <HeaderElement
                label={columnLabels[Columns.requestedSellingPrice]}
                sortOffersByColumn={(sortDirection: SortDirection) =>
                  sortOffersByColumn(
                    Columns.requestedSellingPrice,
                    sortDirection
                  )
                }
                selected={selectedHeader === HeaderElementId.UnitPrice}
                setSelectedHeader={() =>
                  setSelectedHeader(HeaderElementId.UnitPrice)
                }
              ></HeaderElement>
            </Grid.Col>
            <Grid.Col xl={3} lg={3}>
              <HeaderElement
                label={columnLabels[Columns.purchaseToken]}
                sortOffersByColumn={(sortDirection: SortDirection) =>
                  sortOffersByColumn(Columns.purchaseToken, sortDirection)
                }
                selected={selectedHeader === HeaderElementId.BuyWith}
                setSelectedHeader={() =>
                  setSelectedHeader(HeaderElementId.BuyWith)
                }
              ></HeaderElement>
            </Grid.Col>
            <Grid.Col xl={3} lg={3}>
              <HeaderElement
                label={columnLabels[Columns.quantityAvailable]}
                sortOffersByColumn={(sortDirection: SortDirection) =>
                  sortOffersByColumn(Columns.quantityAvailable, sortDirection)
                }
                selected={selectedHeader === HeaderElementId.Quantity}
                setSelectedHeader={() =>
                  setSelectedHeader(HeaderElementId.Quantity)
                }
              ></HeaderElement>
            </Grid.Col>
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
