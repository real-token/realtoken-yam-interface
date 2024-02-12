import { Dispatch, SetStateAction, useState } from 'react';
import { useTranslation } from 'react-i18next';

import {
  ActionIcon,
  Checkbox,
  Grid,
  Group,
  Menu,
  Pagination,
  PaginationProps,
  Select,
} from '@mantine/core';
import { range, useDisclosure, useMediaQuery } from '@mantine/hooks';
import { IconAdjustmentsHorizontal, IconRefresh } from '@tabler/icons';
import { Table } from '@tanstack/react-table';

import { useAtom } from 'jotai';
import { isRefreshedAutoAtom } from 'src/states';
import { useRefreshOffers } from 'src/hooks/offers/useRefreshOffers';

import classes from "./TableCaption.module.css"
import { SelectCreatable } from '../../CreatableSelect/CreatableSelect';

export type TableCaptionOptions = {
  visible?: boolean;
  refreshState?: [boolean, Dispatch<SetStateAction<boolean>>];
};

type TableCaptionProps<T> = {
  table: Table<T>;
  tablecaptionOptions?: TableCaptionOptions;
};

export const TableCaption = <T,>({
  table,
}: TableCaptionProps<T>) => {
  const [isOpen, handlers] = useDisclosure(false);
  const [data, setData] = useState<string[]>([
    '5',
    '10',
    '15',
    '25',
    '50',
    '100',
  ]);
  const [isAutoRefresh,setIsAutoRefresh] = useAtom(isRefreshedAutoAtom);

  console.log('table: ', table.getPageCount())

  const paginationProps: PaginationProps & { page: number } = {
    total: table.getPageCount(),
    page: table.getState().pagination.pageIndex + 1,
    radius: 'md',
    size: 'md',
    siblings: 1,
    onChange: (page) => table.setPageIndex(page - 1),
  };

  const { t } = useTranslation('table', { keyPrefix: 'caption' });

  const { refreshOffers, offersIsLoading } = useRefreshOffers();

  return (
    <Group
      justify={'center'}
      align={'center'}
      gap={8}
      p={'sm'}
      style={(theme) => ({
        borderTop: theme.other.border(theme)
      })}
    >

    <ActionIcon
        size={32}
        color={'brand'}
        loading={offersIsLoading}
        loaderProps={{ size: 'xs' }}
        onClick={() => refreshOffers()}
      >
        <IconRefresh size={16}/>
      </ActionIcon>

      <Pagination {...paginationProps} boundaries={1} />

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
            data={data}
            value={table.getState().pagination.pageSize.toString()}
            setValue={(value) => table.setPageSize(Number(value))}
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

          <Grid p={5} pt={10}>
            <Menu.Label pb={0}>{t('autoRefresh')}</Menu.Label>
            <Checkbox
              p={5}
              checked={isAutoRefresh}
              onChange={(event) => setIsAutoRefresh(Boolean(event.currentTarget.checked))}
            />
          </Grid>
        </Menu.Dropdown>
      </Menu>
    </Group>
  );
};