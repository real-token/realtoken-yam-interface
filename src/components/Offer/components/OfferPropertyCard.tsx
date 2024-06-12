import { createStyles, Flex, Skeleton, Text } from '@mantine/core';
import { IconScale } from '@tabler/icons-react';
import React from 'react';
import { FC } from 'react';

const useStyle = createStyles((theme) => ({
  container: {
    display: 'flex',
    justifyContent: 'center',
    borderColor: theme.colors.brand,
    borderSize: '2px',
    borderStyle: 'solid',
    borderRadius: theme.radius.md,
    padding: theme.spacing.xs,
    fontWeight: 700,
    fontSize: theme.fontSizes.xl,
    height: '100px',
    width: '100px',
  },
}));

interface OfferPropertyCardProps {
  title: string;
  value: string | undefined;
  logo?: React.ReactNode;
}

export const OfferPropertyCard: FC<OfferPropertyCardProps> = ({
  value,
  logo,
  title,
}) => {
  const { classes } = useStyle();

  return (
    <Flex direction={'column'} gap={'sx'} className={classes.container}>
      {value ? (
        <Text fz={32}>{value} </Text>
      ) : (
        <Skeleton width={'100%'} height={30} />
      )}
      <Text fz={'sm'} fw={500}>
        {title}
      </Text>
    </Flex>
  );
};
