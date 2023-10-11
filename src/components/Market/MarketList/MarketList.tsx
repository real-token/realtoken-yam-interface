import React, { useState } from 'react';
import { VariableSizeList as List } from 'react-window';

import {
  Avatar,
  Badge,
  Card,
  Container,
  Grid,
  Group,
  Stack,
  Text,
  TextInput,
  useMantineTheme,
} from '@mantine/core';

const offersData = [
  {
    id: 1,
    productName: 'Product A',
    purchaseToken: 'Token 123',
    launchDate: '2023-10-10',
    sellerName: 'Seller 1',
    offerLocation: 'Location 1',
    electricityCost: 20,
    initialSellingPrice: 100,
    requestedSellingPrice: 80,
    quantityAvailable: 50,
    image: 'https://example.com/productA.jpg', // URL de l'image
  },
  {
    id: 2,
    productName: 'Product B',
    purchaseToken: 'Token 456',
    launchDate: '2023-10-11',
    sellerName: 'Seller 2',
    offerLocation: 'Location 2',
    electricityCost: 15,
    initialSellingPrice: 90,
    requestedSellingPrice: 70,
    quantityAvailable: 30,
    image: 'https://example.com/productB.jpg', // URL de l'image
  },
  {
    id: 3,
    productName: 'Product C',
    purchaseToken: 'Token 789',
    launchDate: '2023-10-12',
    sellerName: 'Seller 3',
    offerLocation: 'Location 3',
    electricityCost: 25,
    initialSellingPrice: 110,
    requestedSellingPrice: 95,
    quantityAvailable: 40,
    image: 'https://example.com/productC.jpg', // URL de l'image
  },
  // Ajoutez plus d'offres si nécessaire
];

const avatarStyle = {
  width: '80px',
  height: '80px',
  marginRight: '20px',
};

// ...
export const OfferList = () => {
  const theme = useMantineTheme();
  const [filterText, setFilterText] = useState('');
  const [sortedOffers, setSortedOffers] = useState(offersData); // State pour les offres triées

  // Tri des offres en fonction du prix de vente
  const sortOffersByPrice = () => {
    const sorted = [...sortedOffers];
    sorted.sort((a, b) => a.requestedSellingPrice - b.requestedSellingPrice);
    setSortedOffers(sorted);
  };

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilterText(event.target.value);
  };

  const renderItem = ({
    index,
    style,
  }: {
    index: number;
    style: React.CSSProperties;
  }) => {
    const offer = sortedOffers[index]; // Utilisez les offres triées

    // Déterminez si c'est la dernière carte
    const isLastItem = index === sortedOffers.length - 1;

    // Style personnalisé pour la dernière carte
    const lastCardStyle = isLastItem
      ? {
          marginTop: '-1px',
          borderRadius: '0 0 10px 10px', // Applique le radius uniquement en bas
          backgroundColor:
            theme.colorScheme === 'dark'
              ? theme.colors.dark[7]
              : theme.colors.gray[0], // Couleur de fond en fonction du thème
        }
      : {
          marginTop: '-1px',
          backgroundColor:
            theme.colorScheme === 'dark'
              ? theme.colors.dark[7]
              : theme.colors.gray[0],
        };

    return (
      <Card withBorder={true} radius={0} style={lastCardStyle}>
        <Grid>
          <Grid.Col span={4}>
            {/* Ajoutez le badge ici */}
            <div
              style={{
                position: 'absolute',
                top: '0px',
                left: '0px',
              }}
            >
              <Badge
                color={'red'}
                radius={0}
                variant={'filled'}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  borderBottomRightRadius: '10px',
                }}
              >
                {'Vente'}
              </Badge>
            </div>
            <Group position={'left'}>
              <Group position={'left'} sx={{ marginTop: '10px' }}>
                <Avatar
                  src={offer.image}
                  alt={offer.productName}
                  style={avatarStyle}
                />
                <div>
                  <Text>{offer.offerLocation}</Text>
                  <Text>{offer.productName}</Text>
                </div>
              </Group>

              <div style={{ marginLeft: '50px' }}>
                <Text>{offer.launchDate}</Text>
                <Text>{offer.initialSellingPrice}</Text>
              </div>
            </Group>
          </Grid.Col>
          <Grid.Col span={1}>
            <Stack h={'100%'} align={'stretch'} justify={'center'}>
              {offer.quantityAvailable}
            </Stack>
          </Grid.Col>
          <Grid.Col span={1}>
            <Stack h={'100%'} align={'stretch'} justify={'center'}>
              {offer.sellerName}
            </Stack>
          </Grid.Col>
          <Grid.Col span={1}>
            <Stack h={'100%'} align={'stretch'} justify={'center'}>
              {offer.requestedSellingPrice}
            </Stack>
          </Grid.Col>
          <Grid.Col span={1}>
            <Stack h={'100%'} align={'stretch'} justify={'center'}>
              {offer.electricityCost}
            </Stack>
          </Grid.Col>
          <Grid.Col span={1}>
            <Stack h={'100%'} align={'stretch'} justify={'center'}>
              {offer.purchaseToken}
            </Stack>
          </Grid.Col>
        </Grid>
      </Card>
    );
  };

  return (
    <Container
      style={{
        maxWidth: 'none',
        width: '100%',
        margin: 0,
        padding: 0,
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <TextInput
          placeholder={'Search for offers...'}
          value={filterText}
          onChange={handleFilterChange}
        />
        <button onClick={sortOffersByPrice}>Sort by Price</button>{' '}
        {/* Ajouter un bouton pour trier par prix */}
      </div>
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
        <Grid>
          <Grid.Col span={4}>
            <TextInput
              placeholder={'Search for offers...'}
              value={filterText}
              onChange={handleFilterChange}
            />
          </Grid.Col>
          <Grid.Col span={1}>
            <div>{'t1'}</div>
          </Grid.Col>
          <Grid.Col span={1}>
            <div>{'t2'}</div>
          </Grid.Col>
          <Grid.Col span={1}>
            <div>{'t3'}</div>
          </Grid.Col>
          <Grid.Col span={1}>
            <div>{'t4'}</div>
          </Grid.Col>
          <Grid.Col span={1}>
            <div>{'t5'}</div>
          </Grid.Col>
        </Grid>
      </Card>

      <List
        height={400}
        itemCount={sortedOffers.length} // Utilisez les offres triées
        itemSize={() => 100}
        width={'100%'}
      >
        {renderItem}
      </List>
    </Container>
  );
};
