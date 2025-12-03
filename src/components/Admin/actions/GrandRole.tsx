import { useTranslation } from 'react-i18next';

import { Button, Flex, Select, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useCurrentNetwork } from '@real-token/core';
import { useSendTransactions } from '@real-token/web3';

import { utils } from 'ethers';

import { useRole } from 'src/hooks/useRole';
import { ROLE, USER_ROLE } from 'src/types/admin';
import { calcRem } from 'src/utils/style';
import { grantRoleTransaction } from 'src/utils/tx/admin';

import { ExtendedChainConfig } from '../../../config/aaConfig';
import { Action } from '../Action';

interface GrandRoleForm {
  type: string;
  address: string;
}

export const GrantRole = () => {
  const { t } = useTranslation('admin');

  const { role } = useRole();

  const datas = [
    {
      label: 'Moderator',
      value: ROLE.get(USER_ROLE.MODERATOR) ?? '',
      disabled: false,
    },
    {
      label: 'Administrator',
      value: ROLE.get(USER_ROLE.ADMIN) ?? '',
      disabled: role == USER_ROLE.MODERATOR,
    },
  ];

  const { getInputProps, isValid, onSubmit } = useForm<GrandRoleForm>({
    initialValues: {
      type: ROLE.get(USER_ROLE.MODERATOR) ?? '',
      address: '',
    },
    validate: {
      address: (value) =>
        utils.isAddress(value) && value !== ''
          ? null
          : t('addWL.invalidAddress'),
    },
  });

  const currentNetwork = useCurrentNetwork<ExtendedChainConfig>();

  const { sendTransactions } = useSendTransactions({});

  const grantRole = async (formValues: GrandRoleForm) => {
    const transactions = grantRoleTransaction(
      currentNetwork,
      formValues.type as `0x${string}`,
      formValues.address as `0x${string}`
    );
    sendTransactions(transactions);
  };

  return (
    <Action title={t('grantRole.title')}>
      <form onSubmit={onSubmit(grantRole)}>
        <Flex gap={'sm'}>
          <Select data={datas} {...getInputProps('type')} />
          <TextInput
            {...getInputProps('address')}
            style={{ width: calcRem(400) }}
          />
          <Button type={'submit'} disabled={!isValid()}>
            {t('grantRole.title')}
          </Button>
        </Flex>
      </form>
    </Action>
  );
};
