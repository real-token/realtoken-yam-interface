import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  Button,
  Badge,
  useMantineTheme,
  Text,
  Avatar,
  Group,
} from '@mantine/core';
import { IconCalculator, IconChevronRight } from '@tabler/icons-react';

interface SimulatorButtonProps {
  toggle: () => void;
}

export const SimulatorButton: React.FC<SimulatorButtonProps> = ({ toggle }) => {
  const { t } = useTranslation('simulator');
  const theme = useMantineTheme();
  const controlBackgroundColor =
    theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[0];
  const contentBorderColor =
    theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2];
  const contentTextColor =
    theme.colorScheme === 'dark' ? undefined : theme.colors.dark[6];
  return (
    <Button
      onClick={toggle}
      color='gray'
      mt={10}
      h={48}
      type={'button'}
      radius={'md'}
      aria-label={t('label')}
      rightIcon={
        <IconChevronRight size={16} color={contentTextColor}></IconChevronRight>
      }
      styles={(theme) => ({
        root: {
          textAlign: 'left',
          backgroundColor: controlBackgroundColor,
          border: `1px solid ${contentBorderColor}`,
          '&:not([data-disabled])': theme.fn.hover({
            backgroundColor: controlBackgroundColor,
          }),
        },
        inner: {
          width: '100%',
          justifyContent: 'space-between',
          textAlign: 'left',
          backgroundColor: controlBackgroundColor,
        },
      })}
    >
      <Group spacing={10}>
        <Avatar
          color={'gray'}
          size={'28px'}
          radius={'xl'}
          variant={'filled'}
          styles={{
            placeholder: {
              backgroundColor:
                theme.colorScheme === 'dark'
                  ? theme.colors.gray[7]
                  : theme.colors.gray[4],
            },
          }}
        >
          <IconCalculator size={'1.2rem'} />
        </Avatar>
        <Text fw={500} fz={'15px'} color={contentTextColor} m={0} p={0}>
          {t('label')}
        </Text>
        <Badge
          color='blue'
          variant='filled'
          size={'xs'}
          style={{ marginLeft: '-7px', marginTop: '-5px' }}
        >
          {t('beta')}
        </Badge>
      </Group>
    </Button>
  );
};
