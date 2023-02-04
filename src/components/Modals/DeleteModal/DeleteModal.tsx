import {
  Dispatch,
  FC,
  SetStateAction,
  useCallback,
  useState,
} from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Button, Container, Group, Input, Stack } from '@mantine/core';
import { useForm } from '@mantine/form';
import { ContextModalProps } from '@mantine/modals';
import { showNotification, updateNotification } from '@mantine/notifications';
import { ContractsID, NOTIFICATIONS, NotificationsID } from 'src/constants';
import { useActiveChain, useContract } from 'src/hooks';
import { useWeb3React } from '@web3-react/core';
import { useRefreshOffers } from 'src/hooks/offers/useRefreshOffers';

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
  const { account, provider } = useWeb3React();
  const { onSubmit, reset } = useForm<DeleteFormValues>({
    initialValues: {
      offerIds,
    },
  });

  const [isSubmitting, setSubmitting] = useState<boolean>(false);
  
  const { refreshOffers } = useRefreshOffers(false);

  const activeChain = useActiveChain();
  const realTokenYamUpgradeable = useContract(
    ContractsID.realTokenYamUpgradeable
  );

  const { t } = useTranslation('modals', { keyPrefix: 'delete' });

  const onClose = useCallback(() => {
    reset();
    context.closeModal(id);
  }, [context, id, reset]);

  const onHandleSubmit = useCallback(
    async (formValues: DeleteFormValues) => {
      try {
        if (
          !account ||
          !provider ||
          !formValues.offerIds ||
          !realTokenYamUpgradeable
        ) {
          return;
        }

        setSubmitting(true);

        let transaction;
        if(isAdminDelete){
          transaction = await realTokenYamUpgradeable.deleteOfferByAdmin([...formValues.offerIds]);
        }else{
          transaction = await realTokenYamUpgradeable.deleteOffer(formValues.offerIds[0]);
        }
          
        const notificationPayload = {
          key: transaction.hash,
          href: `${activeChain?.blockExplorerUrl}tx/${transaction.hash}`,
          hash: transaction.hash,
        };

        showNotification(
          NOTIFICATIONS[NotificationsID.deleteOfferLoading](notificationPayload)
        );

        transaction
          .wait()
          .then(({ status }) => {
            updateNotification(
              NOTIFICATIONS[
                status === 1
                  ? NotificationsID.deleteOfferSuccess
                  : NotificationsID.deleteOfferError
              ](notificationPayload)
            );

            if(status == 1){
              setSubmitting(false);
              refreshOffers();
              onSuccess();
            }
          }
            
          );
      } catch (e) {
        console.error('Error in DeleteModal', e);
      }finally{
        onClose();
      }
    },
    [account, provider, realTokenYamUpgradeable, isAdminDelete, activeChain?.blockExplorerUrl, refreshOffers, onSuccess, onClose]
  );

  return (
    <form onSubmit={onSubmit(onHandleSubmit)}>
      <Stack justify={'center'} align={'stretch'}>
        <Box>
          <Input.Label>{t('deletedOffer')}</Input.Label>
          <Container>
          { offerIds?.length == 1 ?
              offerIds ? offerIds : 'Offer not found'
            :
              offerIds.reduce((x,y) => {
                return `${x}, ${y}`
              })
          }
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
