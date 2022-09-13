import { FC, forwardRef } from 'react';
import { useTranslation } from 'react-i18next';

import { Loader, Select, SelectProps, Stack, Text } from '@mantine/core';

import { BigNumber } from 'bignumber.js';

import { FRC } from 'src/types';

type AssetSelectItemsProps = {
  label: string;
  price: BigNumber;
};

const AssetSelectItems: FRC<AssetSelectItemsProps, HTMLDivElement> = forwardRef(
  ({ label, price, ...props }, ref) => {
    return (
      <Stack spacing={0} {...props} ref={ref}>
        <Text>{label}</Text>
        <Text size={'xs'} color={'dimmed'}>
          {`~${price.toFixed(2, BigNumber.ROUND_DOWN)}$`}
        </Text>
      </Stack>
    );
  }
);
AssetSelectItems.displayName = 'AssetSelectItems';

export const AssetSelect: FC<SelectProps & { loading?: boolean }> = ({
  disabled,
  loading,
  ...props
}) => {
  const { t } = useTranslation('common', { keyPrefix: 'select' });

  return (
    <Select
      inputWrapperOrder={['label', 'input', 'description', 'error']}
      itemComponent={AssetSelectItems}
      required={true}
      searchable={true}
      nothingFound={t('noOption')}
      rightSection={loading && <Loader size={'xs'} />}
      disabled={loading ?? disabled}
      {...props}
    />
  );
};
