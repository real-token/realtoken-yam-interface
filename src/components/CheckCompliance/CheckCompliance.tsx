import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Badge, Button, Dialog, Notification, rem } from '@mantine/core';
import { IconCheck, IconX } from '@tabler/icons';

import { useCompliance } from 'src/hooks';

import { NotificationCompliance } from './Composents/NotificationCompliance';

export const CheckCompliance = () => {
  const { t } = useTranslation('notifications', { keyPrefix: 'kycCheck' });
  const [isCompliant, setIsCompliant] = useState<boolean>(false);
  const [isMessageClosed, setIsMessageClosed] = useState<boolean>(false);
  const complianceRegistry = useCompliance();

  useEffect(() => {
    const getCompliance = async () => {
      try {
        if (!complianceRegistry) return;

        const isValid = await complianceRegistry.contract.isAddressValid(
          ['0xb7900b3af2b9c5d1795f4aeb24aec20515dc8e67'],
          complianceRegistry.account ?? ''.toLocaleLowerCase()
        );
        setIsCompliant(isValid);
      } catch (err) {
        console.log('Failed to check compliance: ', err);
      }
    };

    getCompliance();
  }, [setIsCompliant, complianceRegistry]);
  const icon = isCompliant ? (
    <IconCheck style={{ width: rem(20), height: rem(20) }} />
  ) : (
    <IconX style={{ width: rem(20), height: rem(20) }} />
  );
  return (
    <>
      {
        <Notification
          icon={icon}
          color={isCompliant ? 'teal' : 'red'}
          title={isCompliant ? t('verified') : t('invalid')}
          mt={'md'}
          withCloseButton={false}
          sx={{
            position: 'absolute',
            top: '100px',
            right: '40px',
            cursor: 'pointer',
          }}
          onClick={() => {
            setIsMessageClosed(false);
          }}
        >
          {complianceRegistry?.account}
        </Notification>
      }

      {!isCompliant && (
        <NotificationCompliance
          isNotificationClosed={isMessageClosed}
          setIsNotificationClosed={setIsMessageClosed}
        ></NotificationCompliance>
      )}
    </>
  );
};
