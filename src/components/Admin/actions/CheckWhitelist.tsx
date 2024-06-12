import {
  Button,
  Table,
  Flex,
  TextInput,
  SegmentedControl,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { useState } from 'react';
import { AddressRegistry } from 'src/types/admin';
import { Action } from '../Action';
import { utils } from 'ethers';
import { calcRem } from 'src/utils/style';
import { useTranslation } from 'react-i18next';
import { useCompliance } from 'src/hooks';
import Papa from 'papaparse';

interface GetWLForm {
  addresses: string;
}

const COMPLIANCE_REGISTRY = '0xb7900b3af2b9c5d1795f4aeb24aec20515dc8e67';

export const CheckWL = () => {
  const { t } = useTranslation('admin');
  const [filter, setFilter] = useState('all');
  const { getInputProps, isValid, onSubmit } = useForm<GetWLForm>({
    initialValues: {
      addresses: '',
    },
    validate: {
      addresses: (value) =>
        value.split(';').every((a) => {
          return utils.isAddress(a.trim());
        }) && value !== ''
          ? null
          : t('addWL.invalidAddress'),
    },
  });

  const [addressRegistry, setAddressRegistry] = useState<AddressRegistry[]>([]);

  const complianceRegistry = useCompliance();

  const getWL = async (values: GetWLForm) => {
    try {
      if (!complianceRegistry) return;

      const addresses = values.addresses.split(';').map((a) => a.trim());

      if (addresses.length === 0) return;

      const isWhitelisted: boolean[] = await Promise.all(
        addresses.map((address) => {
          return complianceRegistry.contract.isAddressValid(
            [COMPLIANCE_REGISTRY],
            address.toLocaleLowerCase(),
          );
        }),
      );

      setAddressRegistry(
        addresses.map((address, i) => {
          return { address: address, whitelisted: isWhitelisted[i] };
        }),
      );
    } catch (err) {
      console.log('Failed to check wl: ', err);
    }
  };

  const handleDownload = () => {
    const csv = Papa.unparse(addressRegistry);
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'data.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const rows = addressRegistry
    .filter(
      (a) =>
        (filter === 'valid' && a.whitelisted) ||
        (filter === 'denied' && !a.whitelisted) ||
        filter === 'all',
    )
    .map((element) => (
      <tr key={element.address}>
        <td>{element.address}</td>
        <td>{element.whitelisted ? 'oui' : 'non'}</td>
      </tr>
    ));

  return (
    <Action title={'Vérifier le whitelisting des adresses'}>
      <form onSubmit={onSubmit(getWL)}>
        <Flex gap={'sm'}>
          <TextInput
            {...getInputProps('addresses')}
            style={{ width: calcRem(400) }}
          />
          <Button type={'submit'} disabled={!isValid()}>
            {'Verifier les adresses'}
          </Button>
        </Flex>
      </form>
      {addressRegistry.length > 0 ? (
        <>
          <div>
            <SegmentedControl
              value={filter}
              onChange={setFilter}
              data={[
                { label: 'Tout', value: 'all' },
                { label: 'Valide', value: 'valid' },
                { label: 'Invalide', value: 'denied' },
              ]}
            />{' '}
            <Button onClick={handleDownload}>{'Download CSV'}</Button>
          </div>

          <Table>
            <thead>
              <tr>
                <th>Adresse</th>
                <th>Whitelistée</th>
              </tr>
            </thead>
            <tbody>{rows}</tbody>
          </Table>
        </>
      ) : undefined}
    </Action>
  );
};
