import { FC, useState } from 'react';

import { useForm } from '@mantine/form';
import { ContextModalProps } from '@mantine/modals';
import { ZERO_ADDRESS } from '@real-token/web3';
import { useMutation } from '@tanstack/react-query';
import { multicall } from '@wagmi/core';

import { useConfig } from 'wagmi';

import { coinBridgeTokenABI } from 'src/abis';
import { useCreateOfferTokens } from 'src/hooks/useCreateOfferTokens';
import { OFFER_TYPE } from 'src/types/offer';
import { CreatedOffer } from 'src/types/offer/CreatedOffer';

import { useAssetPrice } from '../../../hooks/useAssetPrice';
import { useRootStore } from '../../../zustandStore/store';
import { CreateOfferProvider } from './CreateOfferModal/CreateOfferContext';
import { BuyOfferModal } from './CreateOfferModal/types/BuyOfferModal';
import { ExchangeOfferModal } from './CreateOfferModal/types/ExchangeOfferModal';
import { SellOfferModal } from './CreateOfferModal/types/SellOfferModal';

type CreateOfferModalProps = {
  offer: CreatedOffer;
};

export type SellFormValues = {
  offerTokenAddress: string;
  buyerTokenAddress: string;
  price: string | undefined;
  useBuyTokenPrice: boolean;
  amount: string | undefined;
  buyerAddress: string;
  isPrivateOffer: boolean;
  choosedPrice: number | undefined;
};

export const CreateOfferModal: FC<ContextModalProps<CreateOfferModalProps>> = ({
  context,
  id,
  innerProps: { offer },
}) => {
  const isModification = offer.price !== undefined;

  const form = useForm<SellFormValues>({
    // eslint-disable-next-line object-shorthand
    initialValues: offer
      ? {
          offerTokenAddress: offer.offerTokenAddress,
          buyerTokenAddress: offer.buyerTokenAddress,
          price: offer.choosedPrice?.toString(),
          amount: offer.amount,
          choosedPrice: offer.choosedPrice,
          useBuyTokenPrice: false,
          buyerAddress: offer.buyerAddress ? offer.buyerAddress : ZERO_ADDRESS,
          isPrivateOffer: offer.isPrivateOffer ?? false,
        }
      : {
          offerTokenAddress: '',
          buyerTokenAddress: '',
          price: '',
          amount: '',
          useBuyTokenPrice: false,
          buyerAddress: ZERO_ADDRESS,
          isPrivateOffer: false,
          choosedPrice: undefined,
        },
    validateInputOnBlur: true,
    validate: {
      offerTokenAddress: (value) =>
        !value || value == ''
          ? 'You need to choose an offerTokenAddress'
          : null,
      buyerTokenAddress: (value) =>
        !value || value == ''
          ? 'You need to choose an buyerTokenAddress'
          : null,
      price: (value) =>
        value == undefined || parseFloat(value) <= 0
          ? 'Price cannot be undefined, or equal or less than 0'
          : null,
      amount: (value) =>
        value == undefined || parseFloat(value) <= 0
          ? 'Amount cannot be undefined, or equal or less than 0'
          : null,
      isPrivateOffer: (value, values) =>
        value
          ? !values.buyerAddress || values.buyerAddress == ''
            ? 'You need to choose a buyer address if offer is private'
            : null
          : null,
    },
    onValuesChange: (values) => {
      console.log(values);
    },
  });

  const { values } = form;
  const [offers, addOffer, modifyOffer] = useRootStore((state) => [
    state.offersToCreate,
    state.addOffer,
    state.modifyOffer,
  ]);

  const [buttonLoading, setButtonLoading] = useState(false);

  const { allowedTokens, properties, buyerTokens, offerTokens } =
    useCreateOfferTokens(
      offer.offerType,
      values.offerTokenAddress,
      values.buyerTokenAddress
    );

  const config = useConfig();

  const { mutate: createOffer, isPending: isSubmitting } = useMutation({
    mutationFn: async (formValues: SellFormValues) => {
      if (!values.amount || !values.price) {
        throw new Error('provider, amount or price not found');
      }

      const multiCallResult = await multicall(config, {
        contracts: [
          {
            abi: coinBridgeTokenABI,
            address: formValues.offerTokenAddress as `0x${string}`,
            functionName: 'decimals',
          },
          {
            abi: coinBridgeTokenABI,
            address: formValues.buyerTokenAddress as `0x${string}`,
            functionName: 'decimals',
          },
        ],
      });

      const offerTokenDecimals = multiCallResult[0].result;
      const buyerTokenDecimals = multiCallResult[1].result;

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
        buyerAddress: formValues.buyerAddress
          ? formValues.buyerAddress.toLowerCase()
          : ZERO_ADDRESS,
        isPrivateOffer: formValues.isPrivateOffer,
      };

      console.log(
        'createOffer/createOfferAdded',
        JSON.stringify(createdOffer, null, 4)
      );

      if (isModification) {
        modifyOffer(offer.offerId, createdOffer);
      } else {
        addOffer(createdOffer);
      }
    },
    onSuccess: () => {
      context.closeModal(id);
    },
    onError: (err) => {
      console.error(err);
    },
  });

  const offerTokenPrice = useAssetPrice({
    tokenType: offer.offerType == OFFER_TYPE.SELL ? 'realtoken' : 'others',
    tokenAddress: values.offerTokenAddress,
  });

  const buyerTokenPrice = useAssetPrice({
    tokenType: offer.offerType == OFFER_TYPE.SELL ? 'others' : 'realtoken',
    tokenAddress: values.buyerTokenAddress,
  });

  return (
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
          onSubmit: () => createOffer(form.values),
          offerType: offer.offerType,
        }}
        isModification={isModification}
      >
        {offer.offerType == OFFER_TYPE.SELL ? (
          <SellOfferModal offer={offer} form={form} />
        ) : undefined}
        {offer.offerType == OFFER_TYPE.BUY ? (
          <BuyOfferModal offer={offer} form={form} />
        ) : undefined}
        {offer.offerType == OFFER_TYPE.EXCHANGE ? (
          <ExchangeOfferModal offer={offer} form={form} />
        ) : undefined}
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
  );
};
