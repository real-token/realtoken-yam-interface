// submitHandlers.js
import { Web3Provider } from '@ethersproject/providers';
import { showNotification, updateNotification } from '@mantine/notifications';

import BigNumber from 'bignumber.js';

import { CoinBridgeToken, coinBridgeTokenABI } from 'src/abis';
import { NOTIFICATIONS, NotificationsID } from 'src/constants';
import { Chain, ContractsID, TypedContract } from 'src/constants';
import coinBridgeTokenPermitSignature from 'src/hooks/coinBridgeTokenPermitSignature';
import erc20PermitSignature from 'src/hooks/erc20PermitSignature';
import { Offer } from 'src/types/offer/Offer';
import { getContract } from 'src/utils';

import { UpdateFormValues } from './Types';

export const onHandleEditSubmit = async (
  formValues: UpdateFormValues,
  account: string | undefined,
  provider: Web3Provider | undefined,
  realTokenYamUpgradeable: TypedContract<ContractsID> | undefined,
  offer: Offer,
  activeChain: Chain | undefined
) => {
  try {
    if (
      !account ||
      !provider ||
      !formValues.offerId ||
      !formValues.price ||
      !formValues.amount ||
      !realTokenYamUpgradeable
    ) {
      return;
    }

    const offerToken = getContract<CoinBridgeToken>(
      offer.offerTokenAddress,
      coinBridgeTokenABI,
      provider,
      account
    );
    if (!offerToken) {
      console.log('offerToken not found');
      return;
    }

    const oldAllowanceOfferToken = await offerToken.allowance(
      account,
      realTokenYamUpgradeable.address
    );

    const [, , , , , amount] = await realTokenYamUpgradeable.getInitialOffer(
      offer.offerId
    );

    const oldAmountInWei = BigNumber(amount._hex);
    offerToken.decimals();
    const newAmountInWei = new BigNumber(formValues.amount).multipliedBy(
      10 ** (await offerToken.decimals())
    );

    const amountInWeiToPermit =
      BigNumber(oldAllowanceOfferToken._hex).comparedTo(oldAmountInWei) > 0
        ? BigNumber(oldAllowanceOfferToken._hex)
            .plus(newAmountInWei)
            .minus(oldAmountInWei)
        : BigNumber(newAmountInWei);

    //isSubmittingRef.current = true;

    const transactionDeadline = Math.floor(Date.now() / 1000) + 3600;

    const offerTokenType = await realTokenYamUpgradeable.getTokenType(
      formValues.offerTokenAddress
    );

    let signature: any;

    if (offerTokenType === 1) {
      signature = await coinBridgeTokenPermitSignature(
        account,
        realTokenYamUpgradeable.address,
        amountInWeiToPermit.toString(10),
        transactionDeadline,
        offerToken,
        provider
      );
    } else if (offerTokenType === 2) {
      signature = await erc20PermitSignature(
        account,
        realTokenYamUpgradeable.address,
        amountInWeiToPermit.toString(10),
        transactionDeadline,
        offerToken,
        provider
      );
    } else if (offerTokenType === 3) {
      const approveTx = await offerToken.approve(
        realTokenYamUpgradeable.address,
        amountInWeiToPermit.toString()
      );

      const notificationApprove = {
        key: approveTx.hash,
        href: `${activeChain?.blockExplorerUrl}tx/${approveTx.hash}`,
        hash: approveTx.hash,
      };

      showNotification(
        NOTIFICATIONS[NotificationsID.approveOfferLoading](notificationApprove)
      );

      approveTx
        .wait()
        .then(({ status }) =>
          updateNotification(
            NOTIFICATIONS[
              status === 1
                ? NotificationsID.approveOfferSuccess
                : NotificationsID.approveOfferError
            ](notificationApprove)
          )
        );

      await approveTx.wait(1);
    }

    const { v, r, s } = signature;

    const price = new BigNumber(formValues.price.toString())
      .shiftedBy(parseFloat(offer.buyerTokenDecimals))
      .toString(10);
    const amountUpdate = BigNumber(formValues.amount)
      .shiftedBy(parseFloat(offer.offerTokenDecimals))
      .toString(10);

    let updateTx;

    if (offerTokenType === 1) {
      updateTx = await realTokenYamUpgradeable.updateOfferWithPermit(
        offer.offerId,
        price,
        amountUpdate,
        amountInWeiToPermit.toString(10),
        transactionDeadline.toString(),
        v,
        r,
        s
      );
    } else if (offerTokenType === 2) {
      updateTx = await realTokenYamUpgradeable.updateOfferWithPermit(
        formValues.offerId,
        price,
        amountUpdate,
        amountInWeiToPermit.toString(10),
        transactionDeadline.toString(),
        v,
        r,
        s
      );
    } else if (offerTokenType === 3) {
      updateTx = await realTokenYamUpgradeable.updateOffer(
        formValues.offerId,
        price,
        amountUpdate
      );
    }

    if (updateTx) {
      const notificationPayload = {
        key: updateTx.hash,
        href: `${activeChain?.blockExplorerUrl}tx/${updateTx.hash}`,
        hash: updateTx.hash,
      };

      showNotification(
        NOTIFICATIONS[NotificationsID.updateOfferLoading](notificationPayload)
      );

      updateTx.wait().then(({ status }) => {
        updateNotification(
          NOTIFICATIONS[
            status === 1
              ? NotificationsID.updateOfferSuccess
              : NotificationsID.updateOfferError
          ](notificationPayload)
        );

        //isSubmittingRef.current = false;
      });
    }
  } catch (e) {
    console.error('Error UpdateModal', e);
    throw e;
    //isSubmittingRef.current = false;
  }
};
