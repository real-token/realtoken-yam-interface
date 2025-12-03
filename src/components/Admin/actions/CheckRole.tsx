import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Button, Flex, Loader, Text, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useQuery } from '@tanstack/react-query';

import { utils } from 'ethers';

import { ContractsID } from 'src/constants';
import { ROLE, USER_ROLE } from 'src/types/admin';
import { calcRem } from 'src/utils/style';

import { useRole } from '../../../hooks/useRole';
import { Action } from '../Action';

interface GetRoleForm {
  address: string;
}

export const CheckRole = () => {
  const { t } = useTranslation('admin');

  const { getInputProps, isValid, onSubmit } = useForm<GetRoleForm>({
    initialValues: {
      address: '',
    },
    validate: {
      address: (value) =>
        utils.isAddress(value) && value !== ''
          ? null
          : t('addWL.invalidAddress'),
    },
  });

  const [address, setAddress] = useState<string>('');
  const { role, isPending } = useRole(address);

  return (
    <Action title={t('checkAddress.title')}>
      <form onSubmit={onSubmit((values) => setAddress(values.address))}>
        <Flex gap={'sm'}>
          <TextInput
            {...getInputProps('address')}
            style={{ width: calcRem(400) }}
          />
          <Button type={'submit'} disabled={!isValid() || isPending}>
            {t('checkAddress.getAddressButton')}
          </Button>
        </Flex>
      </form>
      {isPending ? <Loader size={'sm'} /> : <Text>{`Role: ${role}`}</Text>}
    </Action>
  );
};
