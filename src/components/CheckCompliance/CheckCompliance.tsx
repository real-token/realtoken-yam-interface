import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Group, Notification, em, rem } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { IconCheck, IconX } from '@tabler/icons';

import { useCompliance } from 'src/hooks';

import { NotificationCompliance } from './Composents/NotificationCompliance';

export const CheckCompliance = () => {
  const isMobile = useMediaQuery(`(max-width: ${em(750)})`);
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
      {(isMessageClosed || isCompliant) && (
        <Group position='center'>
          <Notification
            icon={icon}
            color={isCompliant ? 'teal' : 'red'}
            title={isCompliant ? t('verified') : t('invalid')}
            mt={isMobile ? '-140px' : 0}
            withCloseButton={false}
            sx={{
              width: isMobile ? '180px' : 'auto',
              position: isMobile ? 'relative' : 'absolute',
              top: isMobile ? '70px' : '110px',
              right: isMobile ? '10px' : '40px',
              cursor: 'pointer',
              padding: isMobile ? '3px' : undefined,

              justifyContent: 'center',
              alignItems: 'center',
            }}
            onClick={() => {
              setIsMessageClosed(false);
            }}
          >
            {isMobile ? '' : complianceRegistry?.account}
          </Notification>
        </Group>
      )}

      {!isCompliant && (
        <NotificationCompliance
          isNotificationClosed={isMessageClosed}
          setIsNotificationClosed={setIsMessageClosed}
        ></NotificationCompliance>
      )}
    </>
  );
};
