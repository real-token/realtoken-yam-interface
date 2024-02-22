import { Combobox, useCombobox, ComboboxItem, InputBase, Flex, Text, Loader, Skeleton, Input } from '@mantine/core';
import classes from "./ComboboxOfferToken.module.css";
import { useRootStore } from '../../../../zustandStore/store';
import { useMemo, useState } from 'react';
import BigNumber from 'bignumber.js';
import { useTranslation } from 'react-i18next';
import { IconCheck } from '@tabler/icons';

export type DataWithBalance = ComboboxItem & {
  balance: BigNumber;
  selected: boolean;
};

const ComboboxOfferTokenOption = ({ item }: { item: DataWithBalance }) => {

  const { value, balance, label, selected } = item;

  const [userBalancesAreLoading] = useRootStore((state) => [state.userBalancesAreLoading]);

  return(
      <Combobox.Option value={value}>
        <Flex justify={'space-between'} align={'center'}>
          <Flex justify={'space-between'} w={'100%'} pl={4}>
            <Flex gap={4} align={'center'}>
              {selected ? <IconCheck size={16}/> : undefined}
              <Text 
                size="sm" 
                c={'brand'}
                fw={500}
              >
                {label}
              </Text>
            </Flex>
            {!userBalancesAreLoading ? (
              <Text 
                size="sm"
                c={'gray'}
              >
                {balance.toString(10)}
              </Text>
            ): (
              <Skeleton width={200} height={15} />
            )}
          </Flex>
          {userBalancesAreLoading ? <Loader size={18}/> : undefined}
        </Flex>
      </Combobox.Option>
  )
}

export const ComboboxOfferToken = ({ 
    data,
    label,
    value,
    placeholder,
    disabled,
    onChange
 } : {
    data: ComboboxItem[],
    label: string;
    value: any;
    placeholder: string
    disabled: boolean;
    onChange: any;
 }) => {

  const [searchTerm, setSearchTerm] = useState('');

  const { t } = useTranslation('modals', { keyPrefix: 'sell' });

  const combobox = useCombobox({
      onDropdownClose: () => combobox.resetSelectedOption(),
  });

  const [userBalances, userBalancesAreLoading] = useRootStore((state) => [state.userBalances, state.userBalancesAreLoading]);

  const dataWithAmounts: DataWithBalance[] = useMemo(() => data.map((item) => {
    const balance = userBalances[item.value.toLowerCase()] || new BigNumber(0);
    return {
      ...item,
      balance,
      selected: item.value === value
    }
  }), [userBalances, userBalancesAreLoading]);

  const sortedDatas = useMemo(() => dataWithAmounts.sort((a, b) => {
    return b.balance.comparedTo(a.balance);
  }), [dataWithAmounts]);

  const shouldFilterOptions = sortedDatas.every((item) => item.label !== searchTerm);
  const filteredOptions = shouldFilterOptions
    ? sortedDatas.filter((item) => item.label.toLowerCase().includes(searchTerm.toLowerCase().trim()))
    : sortedDatas;

  const options = filteredOptions.map((item) => <ComboboxOfferTokenOption item={item} key={item.value}/>);

  const selectedOption = sortedDatas.find((item) => item.value === value);

  return (
      <Combobox
        store={combobox}
        withinPortal={false}
        offset={0}
        onOptionSubmit={(val) => {
          onChange(val);
          combobox.closeDropdown();
          setSearchTerm('');
        }}
        disabled={disabled}
      >
        <Combobox.Target>
          <InputBase
            label={label}
            component="button"
            type="button"
            pointer={false}
            rightSection={userBalancesAreLoading ? <Loader size={18} /> : <Combobox.Chevron />}
            rightSectionPointerEvents="none"
            classNames={{ input: classes.input }}
            onClick={() => combobox.openDropdown()}
            onFocus={() => combobox.openDropdown()}
            placeholder={placeholder}
          >
            {selectedOption?.label || <Input.Placeholder>{placeholder}</Input.Placeholder>}
          </InputBase>
        </Combobox.Target>
  
        <Combobox.Dropdown className={classes.dropdown}>
          <Combobox.Search
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.currentTarget.value)}
            placeholder={t('searchTokens')}
          />
          <Combobox.Options mah={200} style={{ overflowY: 'auto' }}>
            {userBalancesAreLoading ? <Combobox.Empty>Loading....</Combobox.Empty> : options}
          </Combobox.Options>
        </Combobox.Dropdown>
      </Combobox>
    );

}