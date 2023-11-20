import React, { FC, useEffect, useState } from 'react';

import { ActionIcon, Flex, Text, useMantineTheme } from '@mantine/core';
import { IconChevronDown, IconChevronUp, IconSelector } from '@tabler/icons';

import { Arrow, SortDirection } from './Types';

interface HeaderElementProps {
  label: string;
  description?: string;
  sortByColumn: (sortDirection: SortDirection) => void;
  selected: boolean;
  setSelectedHeader: () => void;
  justify?: string;
}
export const HeaderElement: FC<HeaderElementProps> = ({
  label,
  description,
  sortByColumn,
  selected,
  setSelectedHeader,
  justify = 'right',
}) => {
  const theme = useMantineTheme();
  const [selectedArrow, setSelectedArrow] = useState<Arrow>(Arrow.None);

  useEffect(() => {
    if (!selected) setSelectedArrow(Arrow.None);
  }, [selected]);

  const selectedColor =
    theme.colorScheme === 'dark' ? theme.colors.gray[0] : theme.colors.gray[8];
  const unselectedColor =
    theme.colorScheme === 'dark' ? theme.colors.gray[6] : theme.colors.gray[6];

  return (
    <Flex gap={2} justify={justify} align={'center'} wrap={'wrap'}>
      <div>
        <Text ta={justify as any} fw={500}>
          {label}
        </Text>
        {description && (
          <Text ta={'center'} fz={'xs'} color={'dimmed'}>
            {description}
          </Text>
        )}
      </div>

      <div>
        {selectedArrow === Arrow.None && (
          <ActionIcon
            size={'2'}
            radius={0}
            variant={'transparent'}
            onClick={() => handleArrowClick(Arrow.Down, SortDirection.Asc)}
          >
            <IconSelector size={'0.875rem'} color={unselectedColor} />
          </ActionIcon>
        )}

        {selectedArrow === Arrow.Up && (
          <ActionIcon
            size={'2'}
            radius={0}
            variant={'transparent'}
            onClick={() => handleArrowClick(Arrow.Down, SortDirection.Asc)}
            style={{ height: 10 }}
          >
            <IconChevronUp size={'0.875rem'} color={selectedColor} />
          </ActionIcon>
        )}

        {selectedArrow === Arrow.Down && (
          <ActionIcon
            size={'2'}
            variant={'transparent'}
            radius={0}
            onClick={() => handleArrowClick(Arrow.Up, SortDirection.Desc)}
            style={{ height: 10 }}
          >
            <IconChevronDown size={'0.875rem'} color={selectedColor} />
          </ActionIcon>
        )}
      </div>
    </Flex>
  );

  function handleArrowClick(arrow: Arrow, sortDirection: SortDirection) {
    console.log('sorted', sortDirection);
    setSelectedHeader();
    setSelectedArrow(arrow);
    sortByColumn(sortDirection);
  }
};
