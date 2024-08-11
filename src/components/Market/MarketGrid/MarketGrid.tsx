import { FC, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import {
  ActionIcon,
  Flex,
  Grid,
  Group,
  Menu,
  Pagination,
  Select,
} from '@mantine/core';
import { range, useDisclosure, useMediaQuery } from '@mantine/hooks';
import { IconAdjustmentsHorizontal } from '@tabler/icons';

import { useAtomValue } from 'jotai';

import { useTypedOffers } from 'src/hooks/offers/useTypedOffers';
import { useFilter, useHideDustFilter } from 'src/hooks/useFilter';
import { hideDustAtom, nameFilterValueAtom } from 'src/states';
import { Offer } from 'src/types/offer';

import { selectPublicOffers } from '../../../zustandStore/selectors';
import { useRootStore } from '../../../zustandStore/store';
import { SelectCreatable } from '../../CreatableSelect/CreatableSelect';
import { GridPane } from './GridPane';

export const MarketGrid: FC = () => {
  const publicOffers = useRootStore((state) => selectPublicOffers(state));
  const { offers } = useTypedOffers(publicOffers);

  const [data, setData] = useState<string[]>(['9', '18', '36', '72']);

  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(parseInt(data[2]));

  const paginationProps = {
    total: Math.ceil(offers.length / pageSize),
    page: page,
    radius: 'md',
    size: 'md',
    siblings: 0,
    onChange: (page: number) => setPage(page),
  };

  const mediaQuery = useMediaQuery('(max-width: 720px)');

  const [isOpen, handlers] = useDisclosure(false);
  const { t } = useTranslation('table', { keyPrefix: 'caption' });

  const nameFilterValue = useAtomValue(nameFilterValueAtom);
  const hideDustValue = useAtomValue(hideDustAtom);
  const { filteredDatas: filteredWLData } = useFilter(nameFilterValue, offers);
  const { filteredDatas } = useHideDustFilter(hideDustValue, filteredWLData);

  const paginationOffers: Offer[] = useMemo(() => {
    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    return filteredDatas ? filteredDatas.slice(start, end) : [];
  }, [filteredDatas, page, pageSize]);

  return (
    <Flex gap={'md'} direction={'column'} align={'center'}>
      <Grid gutter={25} style={{ width: '100%' }}>
        {offers.length > 0
          ? paginationOffers.map((offer: Offer, index: number) => (
              <Grid.Col span={4} key={`grid-${index}`}>
                <GridPane offer={offer} />
              </Grid.Col>
            ))
          : // TODO: add message when no offers
            undefined}
      </Grid>
      <Group
        justify={'center'}
        align={'center'}
        gap={8}
        p={'sm'}
        style={(theme) => ({
          borderTop: theme.other.border,
          width: '100%',
        })}
      >
        <Pagination {...paginationProps} boundaries={mediaQuery ? 1 : 0} />
        <Menu
          position={'top'}
          closeOnItemClick={false}
          opened={isOpen}
          onOpen={handlers.open}
          onClose={handlers.close}
        >
          <Menu.Target>
            <ActionIcon size={32} color={'brand'}>
              <IconAdjustmentsHorizontal size={16} />
            </ActionIcon>
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Label pb={0}>{t('lineNumber')}</Menu.Label>
            <SelectCreatable
              value={pageSize.toString()}
              setValue={(value) => setPageSize(Number(value))}
              data={data}
            />
            <Menu.Label pb={0}>{t('goTo')}</Menu.Label>
            <Select
              p={5}
              searchable={true}
              nothingFoundMessage={t('noOption')}
              value={paginationProps.page?.toString()}
              onChange={(value) => paginationProps.onChange!(Number(value))}
              data={[
                ...range(1, paginationProps.total).map((idx) => idx.toString()),
              ]}
            />
          </Menu.Dropdown>
        </Menu>
      </Group>
    </Flex>
  );
};
