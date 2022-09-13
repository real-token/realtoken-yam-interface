import { FC, Fragment } from 'react';
import { useTranslation } from 'react-i18next';

import {
  Table as MantineTable,
  TableProps as MantineTableProps,
} from '@mantine/core';
import { Table as ReactTable, Row, flexRender } from '@tanstack/react-table';

import { TableCaption, TableCaptionOptions } from '../TableCaption';
import { TableHeader } from '../TableHeader';

export type TableSubRowProps<T> = { row: Row<T> };

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

  return (
    <MantineTable {...tableProps}>
      <thead>
        {table.getHeaderGroups().map(({ id, headers }) => (
          <tr key={id}>
            {headers.map((header) => (
              <th
                key={header.id}
                colSpan={header.column.columnDef.meta?.colSpan}
                style={{ textAlign: 'center' }}
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
                {row.getVisibleCells().map(({ id, column, getContext }) => (
                  <td key={id} colSpan={column.columnDef.meta?.colSpan}>
                    {flexRender(column.columnDef.cell, getContext())}
                  </td>
                ))}
              </tr>
              {TableSubRow && row.original && row.getIsExpanded() && (
                <tr>
                  <td
                    colSpan={table.options.meta?.colSpan}
                    style={{ padding: 0 }}
                  >
                    <TableSubRow row={row} />
                  </td>
                </tr>
              )}
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
