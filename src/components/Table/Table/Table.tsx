import { FC, Fragment } from 'react';
import { useTranslation } from 'react-i18next';

import {
  Table as MantineTable,
  TableProps as MantineTableProps,
  Skeleton,
  createStyles,
} from '@mantine/core';
import { Table as ReactTable, Row, flexRender } from '@tanstack/react-table';

import { ENV, isEnvs } from 'src/utils/isEnv';

import { TableCaption, TableCaptionOptions } from '../TableCaption';
import { TableHeader } from '../TableHeader';

export type TableSubRowProps<T> = { row: Row<T> };

const useStyles = createStyles((theme) => ({
  table: {
    overflow: 'clip',
  },
  thead: {
    position: 'sticky',
    top: 0,
    backgroundColor:
      theme.colorScheme == 'dark' ? theme.colors.dark[6] : theme.colors.gray[2],
    zIndex: 1,
  },
}));

type TableProps<T> = {
  tableProps?: MantineTableProps;
  table: ReactTable<T>;
  tablecaptionOptions?: TableCaptionOptions;
  TableSubRow?: FC<TableSubRowProps<T>>;
};

export const Table = <T,>({
  tableProps,
  table,
  tablecaptionOptions,
  TableSubRow,
}: TableProps<T>) => {
  const { t } = useTranslation('table', { keyPrefix: 'table' });
  const { classes } = useStyles();

  return (
    <MantineTable {...tableProps} className={classes.table}>
      <thead className={classes.thead}>
        {table.getHeaderGroups().map(({ id, headers }) => (
          <tr key={id}>
            {headers.map((header) => (
              <th
                key={header.id}
                colSpan={header.column.columnDef.meta?.colSpan}
                style={{ textAlign: 'center', width: header.getSize() }}
              >
                <TableHeader header={header} />
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.length ? (
          table.getRowModel().rows.map((row) => (
            <Fragment key={row.id}>
              <tr>
                {row
                  .getVisibleCells()
                  .map(({ id, column, getContext, getValue }) => (
                    <td key={id} colSpan={column.columnDef.meta?.colSpan}>
                      {String(getValue()) ? (
                        flexRender(column.columnDef.cell, getContext())
                      ) : (
                        <Skeleton height={15} />
                      )}
                    </td>
                  ))}
              </tr>
              {TableSubRow &&
              row.original &&
              row.getIsExpanded() &&
              isEnvs([ENV.DEV]) ? (
                <tr>
                  <td
                    colSpan={table.options.meta?.colSpan}
                    style={{ padding: 0 }}
                  >
                    <TableSubRow row={row} />
                  </td>
                </tr>
              ) : undefined}
            </Fragment>
          ))
        ) : (
          <tr>
            <td
              colSpan={table.options.meta?.colSpan}
              style={{ textAlign: 'center' }}
            >
              {t('noData')}
            </td>
          </tr>
        )}
      </tbody>
      {tablecaptionOptions?.visible && (
        <tfoot>
          <tr>
            <td colSpan={table.options.meta?.colSpan}>
              <TableCaption
                table={table}
                tablecaptionOptions={tablecaptionOptions}
              />
            </td>
          </tr>
        </tfoot>
      )}
    </MantineTable>
  );
};
