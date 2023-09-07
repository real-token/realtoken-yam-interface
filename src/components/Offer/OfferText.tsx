import { FC } from 'react';

import { Flex, Skeleton, Text, createStyles } from '@mantine/core';

const useStyle = createStyles((theme) => ({
  header: {
    color:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[2]
        : theme.colors.gray[6],
  },
  value: {
    color: theme.colorScheme === 'dark' ? undefined : theme.colors.gray[8],
  },
}));

interface OfferTextProps {
  title?: string;
  value: string | undefined;
  width?: number;
}

export const OfferText: FC<OfferTextProps> = ({ title, value, width }) => {
  const { classes } = useStyle();
  return (
    <Flex direction={'column'}>
      {title ? (
        <Text fz={'sm'} className={classes.header}>
          {title}
        </Text>
      ) : undefined}
      {value ? (
        <Text fz={'sm'} fw={600} className={classes.value}>
          {value}
        </Text>
      ) : (
        <Skeleton height={25} width={width ? width : 500} />
      )}
    </Flex>
  );
};
