import { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Group, Notification, em, rem } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { IconCheck, IconX } from '@tabler/icons';

import { useCompliance } from 'src/hooks';

import { NotificationCompliance } from './Composents/NotificationCompliance';

const COMPLIANCE_REGISTRY = '0xb7900b3af2b9c5d1795f4aeb24aec20515dc8e67';

interface ComplianceProps {
  margin?: string;
}
//export const ComplianceStatus: FC<ComplianceProps> = ({ margin }) => {

export const CheckCompliance: FC<ComplianceProps> = ({ margin }) => {
  const isMobile = useMediaQuery(`(max-width: ${em(750)})`);
  const { t } = useTranslation('notifications', { keyPrefix: 'kycCheck' });
  const { t: tWarning } = useTranslation('notifications', {
    keyPrefix: 'warning',
  });
  const [isCompliant, setIsCompliant] = useState<boolean>(false);
  const [isMessageClosed, setIsMessageClosed] = useState<boolean>(false);
  const [isMessageImportantClosed, setIsMessageImportantClosed] =
    useState<boolean>(false);
  const complianceRegistry = useCompliance();

  useEffect(() => {
    const getCompliance = async () => {
      try {
        if (!complianceRegistry) return;

        const isValid = await complianceRegistry.contract.isAddressValid(
          [COMPLIANCE_REGISTRY],
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
      {/*  {(isMessageClosed || isCompliant) && (
        <Group position={'center'}>
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
      )} */}
      {!isMessageImportantClosed && isCompliant && (
        <Notification
          title={tWarning('title')}
          color={'yellow'}
          onClose={() => setIsMessageImportantClosed(true)}
          sx={{ margin: margin ? margin : '0px 0px 20px 0px' }}
        >
          {tWarning('message')}
        </Notification>
      )}
      {!isCompliant && (
        <NotificationCompliance
          isNotificationClosed={isMessageClosed}
          setIsNotificationClosed={setIsMessageClosed}
          margin={margin}
        ></NotificationCompliance>
      )}
      <Group position={isMobile ? 'center' : 'right'}>
        <ComplianceStatus margin={'-16px 0px 10px 0px'}></ComplianceStatus>
      </Group>
    </>
  );
};

export const ComplianceStatus: FC<ComplianceProps> = ({ margin }) => {
  const isMobile = useMediaQuery(`(max-width: ${em(750)})`);
  const { t } = useTranslation('notifications', { keyPrefix: 'kycCheck' });

  const [isCompliant, setIsCompliant] = useState<boolean>(false);

  const complianceRegistry = useCompliance();

  useEffect(() => {
    const getCompliance = async () => {
      try {
        if (!complianceRegistry) return;

        const isValid = await complianceRegistry.contract.isAddressValid(
          [COMPLIANCE_REGISTRY],
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
    <Notification
      icon={icon}
      color={isCompliant ? 'teal' : 'red'}
      title={isCompliant ? t('verified') : t('invalid')}
      //mt={isMobile ? '-140px' : 0}
      withCloseButton={false}
      sx={{
        width: isMobile ? '180px' : 'auto',
        //position: isMobile ? 'relative' : 'absolute',
        //top: isMobile ? '70px' : '110px',
        //right: isMobile ? '10px' : '40px',
        margin: margin,
        cursor: 'pointer',
        padding: isMobile ? '3px' : undefined,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {isMobile ? '' : complianceRegistry?.account}
    </Notification>
  );
};
