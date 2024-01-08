import { ActionIcon, Group, Text } from '@mantine/core';
import { IconChevronDown, IconChevronUp, IconSelector } from '@tabler/icons';
import { Header, flexRender } from '@tanstack/react-table';
import classes from './TableHeader.module.css';

type TableHeaderProps<T> = {
  header: Header<T, unknown>;
};

export const TableHeader = <T,>({ header }: TableHeaderProps<T>) => {
  const canSort = header.column.getCanSort();

  return header.isPlaceholder ? null : (
    <>
      {!canSort ? (
        <Text className={classes.text}>
          {flexRender(header.column.columnDef.header, header.getContext())}
        </Text>
      ) : (
        <Group
          wrap={"nowrap"}
          justify={'center'}
          onClick={header.column.getToggleSortingHandler()}
          className={classes.caption}
        >
          <Text className={classes.text} lineClamp={1}>
            {flexRender(header.column.columnDef.header, header.getContext())}
          </Text>
          {canSort && (
            <ActionIcon variant={'transparent'} color={'brand'}>
              {{
                asc: <IconChevronUp size={16} />,
                desc: <IconChevronDown size={16} />,
              }[header.column.getIsSorted() as string] ?? (
                <IconSelector size={16} />
              )}
            </ActionIcon>
          )}
        </Group>
      )}
    </>
  );
};
