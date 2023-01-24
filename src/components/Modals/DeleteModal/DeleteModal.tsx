import {
  Dispatch,
  FC,
  SetStateAction,
  useCallback,
  useEffect,
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
import { selectPublicOffers } from 'src/store/features/interface/interfaceSelector';
import { useAppSelector } from 'src/hooks/react-hooks';

type DeleteModalProps = {
  offerId: string;
  triggerTableRefresh: Dispatch<SetStateAction<boolean>>;
};

type DeleteFormValues = {
  offerId: string;
};

export const DeleteModal: FC<ContextModalProps<DeleteModalProps>> = ({
  context,
  id,
  innerProps: { offerId, triggerTableRefresh },
}) => {
  const { account, provider } = useWeb3React();
  const { onSubmit, reset, setFieldValue, values } = useForm<DeleteFormValues>({
    initialValues: {
      offerId: offerId,
    },
  });

  const [isSubmitting, setSubmitting] = useState<boolean>(false);
  const [amountMax, setAmountMax] = useState<number>();

  const activeChain = useActiveChain();
  const realTokenYamUpgradeable = useContract(
    ContractsID.realTokenYamUpgradeable
  );

  const offers = useAppSelector(selectPublicOffers);

  const { t } = useTranslation('modals', { keyPrefix: 'delete' });

  const onClose = useCallback(() => {
    reset();
    context.closeModal(id);
  }, [context, id, reset]);

  useEffect(() => {
    setAmountMax(
      Number(
        offers.find((offer) => offer.offerId === values.offerId)
          ?.amount as string
      )
    );
  }, [values]);

  useEffect(() => {
    if (!amountMax) return;
    setFieldValue('amount', amountMax);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [amountMax]);

  const onHandleSubmit = useCallback(
    async (formValues: DeleteFormValues) => {
      try {
        if (
          !account ||
          !provider ||
          !formValues.offerId ||
          !realTokenYamUpgradeable
        ) {
          return;
        }

        setSubmitting(true);

        const transaction = await realTokenYamUpgradeable.deleteOffer(
          formValues.offerId
        );

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

            if(status){
              setSubmitting(false);
              triggerTableRefresh(true);
            }
          }
            
          );
      } catch (e) {
        console.error('Error in DeleteModal', e);
      }finally{
        onClose();
      }
    },
    [
      account,
      activeChain,
      realTokenYamUpgradeable,
      onClose,
      provider,
      triggerTableRefresh,
    ]
  );

  return (
    <form onSubmit={onSubmit(onHandleSubmit)}>
      <Stack justify={'center'} align={'stretch'}>
        <Box>
          <Input.Label>{t('deletedOffer')}</Input.Label>
          <Container>{offerId ? offerId : 'Offer not found'}</Container>
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
