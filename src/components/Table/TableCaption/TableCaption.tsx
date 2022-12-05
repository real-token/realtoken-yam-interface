import { Dispatch, SetStateAction, useState } from 'react';
import { useTranslation } from 'react-i18next';

import {
  ActionIcon,
  Checkbox,
  Grid,
  Group,
  MediaQuery,
  Menu,
  Pagination,
  PaginationProps,
  Select,
} from '@mantine/core';
import { range, useDisclosure } from '@mantine/hooks';
import { IconAdjustmentsHorizontal, IconRefresh } from '@tabler/icons';
import { Table } from '@tanstack/react-table';

import { styles } from './TableCaption.styles';
import { useAtom } from 'jotai';
import { isRefreshedAutoAtom } from 'src/states';

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
  tablecaptionOptions = { refreshState: undefined },
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

  const { refreshState } = tablecaptionOptions;

  const paginationProps: PaginationProps = {
    total: table.getPageCount(),
    page: table.getState().pagination.pageIndex + 1,
    radius: 'md',
    size: 'md',
    siblings: 0,
    onChange: (page) => table.setPageIndex(page - 1),
  };

  const { t } = useTranslation('table', { keyPrefix: 'caption' });

  return (
    <Group
      position={'center'}
      align={'center'}
      spacing={8}
      p={'sm'}
      sx={styles.caption}
    >
      <ActionIcon
        size={32}
        color={'brand'}
        disabled={!refreshState}
        loading={refreshState && refreshState[0]}
        loaderProps={{ size: 'xs' }}
        onClick={() => refreshState![1](true)}
      >
        <IconRefresh size={16} />
      </ActionIcon>

      <MediaQuery smallerThan={'xs'} styles={{ display: 'none' }}>
        <Pagination {...paginationProps} boundaries={1} />
      </MediaQuery>

      <MediaQuery largerThan={'xs'} styles={{ display: 'none' }}>
        <Pagination {...paginationProps} boundaries={0} />
      </MediaQuery>

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
          <Select
            p={5}
            searchable={true}
            creatable={true}
            getCreateLabel={(value) =>
              Number.isInteger(Number(value)) &&
              Number(value) > 0 &&
              Number(value) <= 500
                ? value
                : null
            }
            onCreate={(newData) => {
              setData((current) => [...current, newData]);
              return { value: newData };
            }}
            nothingFound={t('noOption')}
            value={table.getState().pagination.pageSize.toString()}
            onChange={(value) => table.setPageSize(Number(value))}
            data={data}
          />
          <Menu.Label pb={0}>{t('goTo')}</Menu.Label>
          <Select
            p={5}
            searchable={true}
            nothingFound={t('noOption')}
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
