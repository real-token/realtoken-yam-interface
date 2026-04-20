import { FC, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import { Box, Button, Container, Group, Input, Stack } from '@mantine/core';
import { useForm } from '@mantine/form';
import { ContextModalProps } from '@mantine/modals';
import { updateNotification } from '@mantine/notifications';
import { useCurrentNetwork } from '@real-token/core';
import { useSendTransactions } from '@real-token/web3';

import { useAccount, usePublicClient } from 'wagmi';

import { NOTIFICATIONS, NotificationsID } from 'src/constants';

import { ExtendedChainConfig } from '../../../config/aaConfig';
import { useOffers } from '../../../hooks/interface/useOffers';
import {
  DeleteOfferTransactionContext,
  deleteOfferTransactions,
} from '../../../utils/tx/deleteOffer';

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

  const { sendTransactions, isPending: isSubmitting } =
    useSendTransactions<DeleteOfferTransactionContext>({
      initialContext: {
        account: account,
        activeChain: currentNetwork,
      },
      onAllComplete: (receipts) => {
        if (receipts && receipts.length > 0) {
          const lastReceipt = receipts[receipts.length - 1];
          if (lastReceipt && 'txHash' in lastReceipt && lastReceipt.txHash) {
            const notificationPayload = {
              key: 'delete',
              href: `${currentNetwork?.blockExplorerUrl}tx/${lastReceipt.txHash}`,
              hash: lastReceipt.txHash,
            };

            updateNotification(
              NOTIFICATIONS[NotificationsID.deleteOfferSuccess](
                notificationPayload
              )
            );
          }
        }
        refreshOffers();
        onSuccess();
        onClose();
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
    (formValues: DeleteFormValues) => {
      if (
        !account ||
        !formValues.offerIds ||
        !publicClient ||
        !currentNetwork
      ) {
        return;
      }

      sendTransactions(
        deleteOfferTransactions(
          publicClient,
          currentNetwork,
          formValues.offerIds,
          isAdminDelete
        )
      );
    },
    [
      account,
      isAdminDelete,
      currentNetwork,
      publicClient,
      refreshOffers,
      onSuccess,
      onClose,
      sendTransactions,
    ]
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
