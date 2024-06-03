/* eslint-disable react/display-name */
import { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  Button, Checkbox, Flex, 
  Group, Select, Stack, TextInput, 
  Text, NumberInput as MantineInput, 
  Skeleton, Divider, ComboboxItem, Switch,
  Popover, Portal, Card
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { showNotification, updateNotification } from '@mantine/notifications';
import BigNumber from 'bignumber.js';
import { CoinBridgeToken, coinBridgeTokenABI } from 'src/abis';
import { Chain, NOTIFICATIONS, NotificationsID } from 'src/constants';
import { ZERO_ADDRESS } from 'src/constants';
import { getContract } from 'src/utils';
import { NumberInput, truncDigits } from '../../NumberInput';
import { cleanNumber } from 'src/utils/number';
import { useWeb3React } from '@web3-react/core';
import { ContextModalProps } from '@mantine/modals';
import { CreatedOffer } from 'src/types/offer/CreatedOffer';
import { useCreateOfferTokens } from 'src/hooks/useCreateOfferTokens';
import { OfferTypeBadge } from 'src/components/Offer/OfferTypeBadge/OfferTypeBadge';
import { OFFER_TYPE } from 'src/types/offer';
import { useOraclePriceFeed } from 'src/hooks/useOraclePriceFeed';
import { IconArrowRight, IconArrowsHorizontal, IconFocus, IconInfoCircle, IconSwitchHorizontal, IconSwitchVertical } from '@tabler/icons';
import { Shield } from 'src/components/Shield/Shield';
import { useWalletERC20Balance } from 'src/hooks/useWalletERC20Balance';
import { useShield } from 'src/hooks/useShield';
import { usePropertiesToken } from 'src/hooks/usePropertiesToken';
import { WalletERC20Balance } from 'src/components/WalletBalance/WalletERC20Balance';
import { Contract } from 'ethers';
import { Web3Provider } from '@ethersproject/providers';
import { MatchedOffers } from './MatchedOffers/MatchedOffers';
import { useRootStore } from '../../../zustandStore/store';
import { ComboboxOfferToken } from './ComboboxOfferToken/ComboboxOfferToken';
import { useDisclosure } from '@mantine/hooks';
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
  price: number|undefined;
  useBuyTokenPrice: boolean;
  amount: number|undefined;
  buyerAddress: string;
  isPrivateOffer: boolean;
};

export const CreateOfferModal: FC<ContextModalProps<CreateOfferModalProps>> = ({
  context,
  id,
  innerProps: {
    offer
  },
}) => {
  
  const isModification  = offer.price !== undefined;

  const { t } = useTranslation('modals', { keyPrefix: 'sell' });
  const { account, provider } = useWeb3React();

  const form = useForm<SellFormValues>({
    // eslint-disable-next-line object-shorthand
    initialValues: {
      offerTokenAddress: offer?.offerTokenAddress ?? '',
      buyerTokenAddress: offer?.buyerTokenAddress ?? '',
      price: offer?.price ?? undefined,
      amount:
        isModification &&
        offer.amount &&
        offer.price &&
        offer.offerTokenDecimal
          ? new BigNumber(offer.amount)
              .shiftedBy(-offer.offerTokenDecimal)
              .toNumber() / offer.price
          : undefined,
      useBuyTokenPrice: true,
      buyerAddress: offer?.buyerAddress ?? ZERO_ADDRESS,
      isPrivateOffer: offer?.isPrivateOffer ?? false,
    },
    validate: {
      buyerAddress: (value) => (value == account ? t('invalidPrivateOfferAddress'): null),
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

      const total = ((values?.amount ?? 0)* (values.price ?? 0)).toFixed(6);

      let amountInWei;
      if(offer.offerType != OFFER_TYPE.SELL){
        amountInWei = new BigNumber(total).shiftedBy(Number(offerTokenDecimals));
      }else{
        amountInWei = new BigNumber(values?.amount).shiftedBy(Number(offerTokenDecimals));
      }

      const createdOffer: CreatedOffer = {
        offerType: offer.offerType,
        offerId: offers.length,
        offerTokenAddress: formValues.offerTokenAddress.toLowerCase(),
        offerTokenDecimal: offerTokenDecimals,
        buyerTokenAddress: formValues.buyerTokenAddress.toLowerCase(),
        price: values.price ? parseFloat(values.price.toFixed(6)) : 0,
        amount: amountInWei.toString(),
        buyerAddress: formValues.buyerAddress.toLowerCase(),
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
