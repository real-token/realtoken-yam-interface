import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import {
  ActionIcon,
  Checkbox,
  Flex,
  NumberInput,
  Popover,
} from '@mantine/core';
import { IconSettings } from '@tabler/icons-react';

import { useAtom } from 'jotai';

import { hideDustAtom, hideDustValueAtom } from '../../../states';

export const HideDustCheckbox: FC = () => {
  const { t } = useTranslation('table', { keyPrefix: 'filters' });

  const [hideDust, setHideDust] = useAtom(hideDustAtom);
  const [hideDustValue, setHideDustValue] = useAtom(hideDustValueAtom);

  return (
    <Flex align={'center'} gap={'xs'}>
      <Checkbox
        label={t('hideDust')}
        checked={hideDust}
        onChange={(event) => {
          setHideDust(event.currentTarget.checked);
        }}
      />
      <Popover>
        <Popover.Target>
          <ActionIcon variant={"subtle"} size={'xs'}>
            <IconSettings size={18} />
          </ActionIcon>
        </Popover.Target>
        <Popover.Dropdown>
          <NumberInput
            label={t('hideDustValue')}
            decimalScale={18}
            min={0}
            step={0.01}
            value={hideDustValue}
            onChange={(value) => {
              setHideDustValue(value.toString());
            }}
          />
        </Popover.Dropdown>
      </Popover>
    </Flex>
  );
};
