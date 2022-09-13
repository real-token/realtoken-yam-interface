import { ActionIcon, Group, Text } from '@mantine/core';
import { IconChevronDown, IconChevronUp, IconSelector } from '@tabler/icons';
import { Header, flexRender } from '@tanstack/react-table';

import { styles } from './TableHeader.styles';

type TableHeaderProps<T> = {
  header: Header<T, unknown>;
};

export const TableHeader = <T,>({ header }: TableHeaderProps<T>) => {
  const canSort = header.column.getCanSort();

  return header.isPlaceholder ? null : (
    <>
      {!canSort ? (
        <Text sx={styles.text}>
          {flexRender(header.column.columnDef.header, header.getContext())}
        </Text>
      ) : (
        <Group
          noWrap={true}
          position={'center'}
          onClick={header.column.getToggleSortingHandler()}
          sx={(theme) => styles.caption(theme, { canSort })}
        >
          <Text sx={styles.text} lineClamp={1}>
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
