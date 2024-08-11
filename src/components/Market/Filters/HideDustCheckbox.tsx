import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { Checkbox } from '@mantine/core';

import { useAtom } from 'jotai';

import { hideDustAtom } from '../../../states';

export const HideDustCheckbox: FC = () => {
  const { t } = useTranslation('table', { keyPrefix: 'filters' });

  const [hideDust, setHideDust] = useAtom(hideDustAtom);

  return (
    <Checkbox
      label={t('hideDust')}
      checked={hideDust}
      onChange={(event) => {
        setHideDust(event.currentTarget.checked);
      }}
    />
  );
};
