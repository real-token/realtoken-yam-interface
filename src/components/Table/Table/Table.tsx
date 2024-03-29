import { FC, Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Skeleton,
  Table as MantineTable,
  TableProps as MantineTableProps,
} from '@mantine/core';
import { Table as ReactTable, Row, flexRender } from '@tanstack/react-table';
import { TableCaption, TableCaptionOptions } from '../TableCaption';
import { TableHeader } from '../TableHeader';
import { ENV, isEnvs } from 'src/utils/isEnv';

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
      //
      <div style={{ border: 'thin solid #424242', borderRadius: '0.5em' }}>
        <MantineTable  {...tableProps} stickyHeader={true} withRowBorders={true}>
          <MantineTable.Thead style={{ zIndex: 999999 }}>
            {table.getHeaderGroups().map(({ id, headers }) => (
              <MantineTable.Tr key={id}>
                {headers.map((header) => (
                  <MantineTable.Th
                    key={header.id}
                    colSpan={header.column.columnDef.meta?.colSpan}
                    style={{ textAlign: 'center', width: header.getSize() }}
                  >
                    <TableHeader header={header} />
                  </MantineTable.Th>
                ))}
              </MantineTable.Tr>
            ))}
          </MantineTable.Thead>
          <MantineTable.Tbody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <Fragment key={row.id}>
                  <MantineTable.Tr>
                    {row.getVisibleCells().map(({ id, column, getContext, getValue }) => (
                      <MantineTable.Td key={id} colSpan={column.columnDef.meta?.colSpan}>
                        { String(getValue()) ? flexRender(column.columnDef.cell, getContext()) : <Skeleton height={15}/>}
                      </MantineTable.Td>
                    ))}
                  </MantineTable.Tr>
                  {TableSubRow && row.original && row.getIsExpanded() && isEnvs([ENV.DEV]) ? (
                    <MantineTable.Tr>
                      <MantineTable.Td
                        colSpan={table.options.meta?.colSpan}
                        style={{ padding: 0}}
                      >
                        <TableSubRow row={row} />
                      </MantineTable.Td>
                    </MantineTable.Tr>
                  ) : undefined}
                </Fragment>
              ))
            ) : (
              <MantineTable.Tr>
                <MantineTable.Td
                  colSpan={table.options.meta?.colSpan}
                  style={{ textAlign: 'center' }}
                >
                  {t('noData')}
                </MantineTable.Td>
              </MantineTable.Tr>
            )}
          </MantineTable.Tbody>
          {tablecaptionOptions?.visible && (
          <MantineTable.Tfoot>
            <MantineTable.Tr>
              <td colSpan={table.options.meta?.colSpan}>
                <TableCaption
                  table={table}
                  tablecaptionOptions={tablecaptionOptions}
                />
              </td>
            </MantineTable.Tr>
          </MantineTable.Tfoot>
          )}
        </MantineTable>
      </div>
  );
};
