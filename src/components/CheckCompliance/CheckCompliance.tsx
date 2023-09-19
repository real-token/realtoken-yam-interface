import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Button, Flex, Text, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';

import { utils } from 'ethers';

import { ContractsID } from 'src/constants';
import { useContract } from 'src/hooks';
import { ROLE, USER_ROLE } from 'src/types/admin';
import { calcRem } from 'src/utils/style';

interface GetRoleForm {
  address: string;
}

export const CheckCompliance = () => {
  const { t } = useTranslation('admin');

  const [isCompliant, setIsCompliant] = useState<boolean>(false);
  const complianceRegistry = useContract(ContractsID.complianceRegistry);

  // const getCompliance = async (values: GetRoleForm) => {
  //   try {
  //     if (!complianceRegistry) return;

  //     const [isAdmin, isModerator] = await Promise.all([
  //       complianceRegistry.isAddressValid (
  //         ROLE.get(USER_ROLE.ADMIN) ?? '',
  //         values.address
  //       )

  //     ]);

  //     setIsCompliant(true);
  //   } catch (err) {
  //     console.log('Failed to check role: ', err);
  //   }
  // };

  return <div>{'Is compliant : ' + isCompliant}</div>;
};
