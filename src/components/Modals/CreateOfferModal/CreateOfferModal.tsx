/* eslint-disable react/display-name */
import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useForm } from '@mantine/form';
import { showNotification, updateNotification } from '@mantine/notifications';
import BigNumber from 'bignumber.js';
import { CoinBridgeToken, coinBridgeTokenABI } from 'src/abis';
import { Chain, NOTIFICATIONS, NotificationsID } from 'src/constants';
import { ZERO_ADDRESS } from 'src/constants';
import { getContract } from 'src/utils';
import { useWeb3React } from '@web3-react/core';
import { ContextModalProps } from '@mantine/modals';
import { CreatedOffer } from 'src/types/offer/CreatedOffer';
import { useCreateOfferTokens } from 'src/hooks/useCreateOfferTokens';
import { OFFER_TYPE } from 'src/types/offer';
import { Contract } from 'ethers';
import { Web3Provider } from '@ethersproject/providers';
import { useRootStore } from '../../../zustandStore/store';
import { SellOfferModal } from './CreateOfferModal/types/SellOfferModal';
import { CreateOfferProvider } from './CreateOfferModal/CreateOfferContext';
import { useAssetPrice } from '../../../hooks/useAssetPrice';
import { BuyOfferModal } from './CreateOfferModal/types/BuyOfferModal';
import { ExchangeOfferModal } from './CreateOfferModal/types/ExchangeOfferModal';

export const approveOffer = (
  createdOffer: CreatedOffer, 
  provider: Web3Provider|undefined, 
  account: string|undefined, 
  realTokenYamUpgradeable: Contract|undefined, 
  setSubmitting: (status: boolean) => void, 
  activeChain: Chain|undefined
): Promise<void> => {
  return new Promise<void>(async (resolve,reject) => {
    if(!provider || !realTokenYamUpgradeable || !account || !createdOffer.amount) return;
    try{
      setSubmitting(true);
      const offerToken = getContract<CoinBridgeToken>(
        createdOffer.offerTokenAddress,
        coinBridgeTokenABI,
        provider,
        account
      );

      if (!offerToken) {
        console.log('offerToken not found');
        return;
      }

      const amount = new BigNumber(createdOffer.amount);
      const oldAllowance = await offerToken.allowance(account,realTokenYamUpgradeable.address);
      const amountInWeiToPermit = amount.plus(new BigNumber(oldAllowance.toString())).toString(10);

      console.log("amountInWei: ", createdOffer.amount.toString())
      console.log("oldAllowance: ", oldAllowance.toString())
      console.log("amountInWeiToPermit: ", amountInWeiToPermit)

      // TokenType = 3: ERC20 Without Permit, do Approve/CreateOffer
      BigNumber.set({EXPONENTIAL_AT: 35});
      const approveTx = await offerToken.approve(
        realTokenYamUpgradeable.address,
        amountInWeiToPermit
      );

      const notificationApprove = {
        key: approveTx.hash,
        href: `${activeChain?.blockExplorerUrl}tx/${approveTx.hash}`,
        hash: approveTx.hash,
      };

      showNotification(
        NOTIFICATIONS[NotificationsID.approveOfferLoading](
          notificationApprove
        )
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

      resolve();

    }catch(err){
      setSubmitting(false);
      reject(err)
    }
  });
}

type CreateOfferModalProps = {
  offer: CreatedOffer
}

export type SellFormValues = {
  offerTokenAddress: string;
  buyerTokenAddress: string;
  price: string|undefined;
  useBuyTokenPrice: boolean;
  amount: string|undefined;
  buyerAddress: string;
  isPrivateOffer: boolean;
  choosedPrice: number|undefined;
};

export const CreateOfferModal: FC<ContextModalProps<CreateOfferModalProps>> = ({
  context,
  id,
  innerProps: {
    offer
  },
}) => {
  
  const isModification  = offer.price !== undefined;

  const { account, provider } = useWeb3React();

  const form = useForm<SellFormValues>({
    // eslint-disable-next-line object-shorthand
    // initialValues: {
    //   offerTokenAddress: offer?.offerTokenAddress ?? '',
    //   buyerTokenAddress: offer?.buyerTokenAddress ?? '',
    //   price: offer?.price ?? undefined,
    //   amount:
    //     isModification &&
    //     offer.amount &&
    //     offer.price &&
    //     offer.offerTokenDecimal
    //       ? new BigNumber(offer.amount)
    //           .shiftedBy(-offer.offerTokenDecimal)
    //           .toString() / offer.price
    //       : undefined,
    //   useBuyTokenPrice: false,
    //   buyerAddress: offer?.buyerAddress ?? ZERO_ADDRESS,
    //   isPrivateOffer: offer?.isPrivateOffer ?? false,
    // },
    validateInputOnBlur: true,
    validate: {
      offerTokenAddress: (value) => !value || value == "" ? 'You need to choose an offerTokenAddress' : null,
      buyerTokenAddress: (value) => !value || value == "" ? 'You need to choose an buyerTokenAddress' : null,
      price: (value) => value == undefined || parseFloat(value) <= 0 ? 'Price cannot be undefined, or equal or less than 0' : null,
      amount: (value) => value == undefined || parseFloat(value) <= 0 ? 'Amount cannot be undefined, or equal or less than 0' : null,
      isPrivateOffer: (value, values) => value ? !values.buyerAddress || values.buyerAddress == "" ? 'You need to choose a buyer address if offer is private' : null : null
    },
    onValuesChange: (values) => {
      console.log(values);
    },
  });

  const { values } = form;
  const [offers, addOffer] = useRootStore(state => [state.offersToCreate, state.addOffer]);

  const [buttonLoading, setButtonLoading] = useState(false);

  const { allowedTokens, properties, buyerTokens, offerTokens } = useCreateOfferTokens(offer.offerType, values.offerTokenAddress, values.buyerTokenAddress);

  const createdOffer = async (formValues: SellFormValues) => {
    try{

      console.log('createOffer/formValues', formValues);

      setButtonLoading(true);

      if(!provider || !values.amount || !values.price){
        console.error('provider, amount or price not found');
        setButtonLoading(false);
        return;
      };

      const offerToken = getContract<CoinBridgeToken>(
        formValues.offerTokenAddress,
        coinBridgeTokenABI,
        provider,
        account
      );
      const offerTokenDecimals = await offerToken?.decimals();

      const buyerToken = getContract<CoinBridgeToken>(
        formValues.buyerTokenAddress,
        coinBridgeTokenABI,
        provider,
        account
      );
      const buyerTokenDecimals = await buyerToken?.decimals();

      const createdOffer: CreatedOffer = {
        offerType: offer.offerType,
        offerId: offers.length,
        offerTokenAddress: formValues.offerTokenAddress.toLowerCase(),
        offerTokenDecimal: offerTokenDecimals,
        buyerTokenAddress: formValues.buyerTokenAddress.toLowerCase(),
        buyerTokenDecimal: buyerTokenDecimals,
        price: values.price.toString(),
        amount: formValues.amount ? formValues.amount.toString() : '0',
        choosedPrice: values.choosedPrice,
        buyerAddress: formValues.buyerAddress ? formValues.buyerAddress.toLowerCase() : ZERO_ADDRESS,
        isPrivateOffer: formValues.isPrivateOffer,
      };

      console.log(
        'createOffer/createOfferAdded',
        JSON.stringify(createdOffer, null, 4)
      );

      addOffer(createdOffer);

      context.closeModal(id);
      setButtonLoading(false);

    }catch(err){
      console.error(err);
      setButtonLoading(false);
    }
  }

  const offerTokenPrice = useAssetPrice({
    tokenType: offer.offerType == OFFER_TYPE.SELL ? 'realtoken' : 'others', 
    tokenAddress: values.offerTokenAddress
  });

  const buyerTokenPrice = useAssetPrice({ 
    tokenType: offer.offerType == OFFER_TYPE.SELL ? 'others' : 'realtoken', 
    tokenAddress: values.buyerTokenAddress
  });

  return(
    <>
    <CreateOfferProvider
      values={{
        ...form.values,
        setFieldValue: form.setFieldValue,
        offerTokens,
        buyerTokens,
        offerTokenPrice,
        buyerTokenPrice,
        properties,
        allowedTokens,
        isLoading: buttonLoading,
        onSubmit: createdOffer,
        offerType: offer.offerType
      }}
    >
      {offer.offerType == OFFER_TYPE.SELL ? <SellOfferModal offer={offer} form={form} /> : undefined}
      {offer.offerType == OFFER_TYPE.BUY ? <BuyOfferModal offer={offer} form={form} /> : undefined}
      {offer.offerType == OFFER_TYPE.EXCHANGE ? <ExchangeOfferModal offer={offer} form={form} /> : undefined}
    </CreateOfferProvider>
    {/* <Portal>
      <MatchedOffers 
          offerType={offer.offerType}
          offerTokenAddress={values.offerTokenAddress}
          buyerTokenAddress={values.buyerTokenAddress}
          price={values.price}
          amount={values.amount}
          closeModal={closeModal}
        />
    </Portal> */}
    </>
  )
};