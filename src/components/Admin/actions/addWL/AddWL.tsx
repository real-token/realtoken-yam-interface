import { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import {
  ActionIcon,
  Button,
  Flex,
  Select,
  TextInput,
  Tooltip,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { useCurrentNetwork } from '@real-token/core';
import { IconEdit, IconX } from '@tabler/icons-react';
import { useQuery } from '@tanstack/react-query';
import { readContract } from '@wagmi/core';

import { utils } from 'ethers';
import { useAtom } from 'jotai';
import { useConfig } from 'wagmi';

import { ContractsID } from 'src/constants';
import { wlTokensAtom } from 'src/states';
import { calcRem } from 'src/utils/style';

import { realTokenYamUpgradeableABI } from '../../../../abis';
import { ExtendedChainConfig } from '../../../../config/aaConfig';

interface AddWLForm {
  type: string;
  address: string;
}

interface AddWLProps {
  index: number;
}
export const AddWL: FC<AddWLProps> = ({ index }) => {
  const { t } = useTranslation('admin', { keyPrefix: 'addWL' });

  const datas: { label: string; value: string }[] = [
    {
      label: t('tokenType.0'),
      value: '0',
    },
    {
      label: t('tokenType.1'),
      value: '1',
    },
    {
      label: t('tokenType.2'),
      value: '2',
    },
    {
      label: t('tokenType.3'),
      value: '3',
    },
  ];

  const { getInputProps, values, isValid, onSubmit } = useForm<AddWLForm>({
    initialValues: {
      type: datas[1].value,
      address: '',
    },
    validate: {
      type: (value) => (value !== '' ? null : t('invalidTokenType')),
      address: (value) =>
        utils.isAddress(value) && value !== '' ? null : t('invalidAddress'),
    },
  });

  const [isEdit, setIsEdit] = useState<boolean>(true);
  const [wlTokens, setWlTokens] = useAtom(wlTokensAtom);

  const currentNetwork = useCurrentNetwork<ExtendedChainConfig>();
  const config = useConfig();

  const { data: isAlreadyWL, isPending: isLoading } = useQuery({
    queryKey: ['realTokenYamUpgradeable'],
    enabled:
      !!values.address &&
      utils.isAddress(values.address) &&
      !!currentNetwork &&
      !!config,
    queryFn: async () => {
      if (!currentNetwork || !config) return;

      const tokenType = await readContract(config, {
        address: currentNetwork.contracts
          .realTokenYamUpgradeableAddress as `0x${string}`,
        abi: realTokenYamUpgradeableABI,
        functionName: 'getTokenType',
        args: [values.address as `0x${string}`],
      });

      return tokenType == parseInt(values.type);
    },
  });

  const save = async (formValues: AddWLForm) => {
    const newToken = {
      type: formValues.type,
      address: formValues.address,
    };

    const newWLTokens = [...wlTokens];
    newWLTokens[index] = newToken;

    setWlTokens(newWLTokens);
    setIsEdit(false);
  };

  const deleteWL = () => {
    const tokens = [...wlTokens];
    delete tokens[index];
    setWlTokens(tokens);
  };

  return (
    <form onSubmit={onSubmit(save)}>
      <Flex gap={'md'} align={'center'}>
        <ActionIcon color={'red'} onClick={() => deleteWL()}>
          <IconX />
        </ActionIcon>
        <Select
          data={datas}
          {...getInputProps('type')}
          style={{ width: calcRem(400) }}
          disabled={!isEdit}
        />
        <Tooltip
          label={t('tokenAlreadyWL')}
          position={'right'}
          opened={isAlreadyWL}
          color={'red'}
          withArrow={true}
          offset={10}
        >
          <TextInput
            style={{ width: calcRem(400) }}
            disabled={!isEdit}
            {...getInputProps('address')}
          />
        </Tooltip>
        <ActionIcon
          color={'green'}
          disabled={isEdit}
          onClick={() => setIsEdit(true)}
        >
          <IconEdit />
        </ActionIcon>
        <Button
          disabled={!isEdit || !isValid() || isAlreadyWL}
          loading={isLoading}
          type={'submit'}
        >
          {'Add'}
        </Button>
      </Flex>
    </form>
  );
};
