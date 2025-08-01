import { FC, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import { Box, Button, Container, Group, Input, Stack } from '@mantine/core';
import { useForm } from '@mantine/form';
import { ContextModalProps } from '@mantine/modals';
import { showNotification, updateNotification } from '@mantine/notifications';
import { useCurrentNetwork } from '@real-token/core';
import { useSendTransaction } from '@real-token/web3';

import { useAccount, usePublicClient } from 'wagmi';

import { NOTIFICATIONS, NotificationsID } from 'src/constants';

import { realTokenYamUpgradeableABI } from '../../../abis';
import { ExtendedChainConfig } from '../../../config/aaConfig';
import { useOffers } from '../../../hooks/interface/useOffers';

type DeleteModalProps = {
  offerIds: string[];
  onSuccess: () => unknown;
  isAdminDelete?: boolean;
};

type DeleteFormValues = {
  offerIds: string[];
};

export const DeleteModal: FC<ContextModalProps<DeleteModalProps>> = ({
  context,
  id,
  innerProps: { offerIds, onSuccess, isAdminDelete = false },
}) => {
  const { address: account } = useAccount();
  const publicClient = usePublicClient();

  const { onSubmit, reset } = useForm<DeleteFormValues>({
    initialValues: {
      offerIds,
    },
  });

  const { refetch: refreshOffers } = useOffers();

  const currentNetwork = useCurrentNetwork<ExtendedChainConfig>();

  const { t } = useTranslation('modals', { keyPrefix: 'delete' });

  const onClose = useCallback(() => {
    reset();
    context.closeModal(id);
  }, [context, id, reset]);

  const { sendTransaction, isPending: isSubmitting } = useSendTransaction({
    onSent: () => {
      showNotification(
        NOTIFICATIONS[NotificationsID.deleteOfferLoading]({
          key: 'delete',
          hash: '',
          href: '',
        })
      );
    },
    onSuccess: (hash) => {
      if (typeof hash !== 'string') return;

      const notificationPayload = {
        key: 'delete',
        href: `${currentNetwork?.blockExplorerUrl}tx/${hash}`,
        hash: hash,
      };

      updateNotification(
        NOTIFICATIONS[NotificationsID.deleteOfferSuccess](notificationPayload)
      );
    },
    onError: (error) => {
      console.error('Error in DeleteModal', error);
      updateNotification(
        NOTIFICATIONS[NotificationsID.deleteOfferError]({
          key: 'delete',
          hash: '',
          href: '',
        })
      );
    },
  });

  const onHandleSubmit = useCallback(
    async (formValues: DeleteFormValues) => {
      try {
        if (!account || !formValues.offerIds) {
          return;
        }

        const realTokenYamUpgradeableAddress =
          currentNetwork?.contracts.realTokenYamUpgradeableAddress;
        if (!realTokenYamUpgradeableAddress) {
          return;
        }

        if (isAdminDelete) {
          sendTransaction({
            abi: realTokenYamUpgradeableABI,
            to: realTokenYamUpgradeableAddress as `0x${string}`,
            functionName: 'deleteOfferByAdmin',
            args: [formValues.offerIds.map((id) => BigInt(id))],
          });
        } else {
          sendTransaction({
            abi: realTokenYamUpgradeableABI,
            to: realTokenYamUpgradeableAddress as `0x${string}`,
            functionName: 'deleteOffer',
            args: [BigInt(formValues.offerIds[0])],
          });
        }
      } catch (e) {
        console.error('Error in DeleteModal', e);
      }
    },
    [account, isAdminDelete, currentNetwork, refreshOffers, onSuccess, onClose]
  );

  return (
    <form onSubmit={onSubmit(onHandleSubmit)}>
      <Stack justify={'center'} align={'stretch'}>
        <Box>
          <Input.Label>{t('deletedOffer')}</Input.Label>
          <Container>
            {offerIds?.length == 1
              ? offerIds
                ? offerIds
                : 'Offer not found'
              : offerIds.reduce((x, y) => {
                  return `${x}, ${y}`;
                })}
          </Container>
        </Box>
        <Group grow={true}>
          <Button color={'red'} onClick={onClose} aria-label={t('cancel')}>
            {t('cancel')}
          </Button>
          <Button
            type={'submit'}
            loading={isSubmitting}
            aria-label={t('confirm')}
          >
            {t('confirm')}
          </Button>
        </Group>
      </Stack>
    </form>
  );
};
