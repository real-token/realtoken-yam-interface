/* eslint-disable react/display-name */
import { FC, forwardRef, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Web3Provider } from '@ethersproject/providers';
import {
  Button,
  Checkbox,
  Divider,
  Flex,
  Group,
  NumberInput as MantineInput,
  Select,
  SelectItem,
  Skeleton,
  Stack,
  Text,
  TextInput,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { ContextModalProps } from '@mantine/modals';
import { showNotification, updateNotification } from '@mantine/notifications';
import { IconArrowRight, IconArrowsHorizontal } from '@tabler/icons';
import { useWeb3React } from '@web3-react/core';

import BigNumber from 'bignumber.js';
import { Contract } from 'ethers';

import { CoinBridgeToken, coinBridgeTokenABI } from 'src/abis';
import { OfferTypeBadge } from 'src/components/Offer/OfferTypeBadge';
import { Shield } from 'src/components/Shield/Shield';
import { WalletERC20Balance } from 'src/components/WalletBalance/WalletERC20Balance';
import { Chain, NOTIFICATIONS, NotificationsID } from 'src/constants';
import { ZERO_ADDRESS } from 'src/constants';
import { useAppDispatch, useAppSelector } from 'src/hooks/react-hooks';
import { useCreateOfferTokens } from 'src/hooks/useCreateOfferTokens';
import { useOraclePriceFeed } from 'src/hooks/useOraclePriceFeed';
import { usePropertiesToken } from 'src/hooks/usePropertiesToken';
import { useShield } from 'src/hooks/useShield';
import { useWalletERC20Balance } from 'src/hooks/useWalletERC20Balance';
import { selectCreateOffers } from 'src/store/features/createOffers/createOffersSelector';
import { createOfferAddedDispatchType } from 'src/store/features/createOffers/createOffersSlice';
import { OFFER_TYPE } from 'src/types/offer';
import { CreatedOffer } from 'src/types/offer/CreatedOffer';
import { getContract } from 'src/utils';
import { cleanNumber } from 'src/utils/number';

import { NumberInput, truncDigits } from '../../NumberInput';
import { MatchedOffers } from './MatchedOffers/MatchedOffers';

export const approveOffer = (
  createdOffer: CreatedOffer,
  provider: Web3Provider | undefined,
  account: string | undefined,
  realTokenYamUpgradeable: Contract | undefined,
  setSubmitting: (status: boolean) => void,
  activeChain: Chain | undefined
): Promise<void> => {
  return new Promise<void>(async (resolve, reject) => {
    if (
      !provider ||
      !realTokenYamUpgradeable ||
      !account ||
      !createdOffer.amount
    )
      return;
    try {
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
      const oldAllowance = await offerToken.allowance(
        account,
        realTokenYamUpgradeable.address
      );
      const amountInWeiToPermit = amount
        .plus(new BigNumber(oldAllowance.toString()))
        .toString(10);

      console.log('amountInWei: ', createdOffer.amount.toString());
      console.log('oldAllowance: ', oldAllowance.toString());
      console.log('amountInWeiToPermit: ', amountInWeiToPermit);

      // TokenType = 3: ERC20 Without Permit, do Approve/CreateOffer
      BigNumber.set({ EXPONENTIAL_AT: 35 });
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

      resolve();
    } catch (err) {
      setSubmitting(false);
      reject(err);
    }
  });
};

interface ItemProps extends React.ComponentPropsWithoutRef<'div'> {
  label: string;
  uuid: string;
  value: string;
}

type CreateOfferModalProps = {
  offer: CreatedOffer;
};

type SellFormValues = {
  offerTokenAddress: string;
  buyerTokenAddress: string;
  price: number | undefined;
  amount: number | undefined;
  buyerAddress: string;
  isPrivateOffer: boolean;
};

export const CreateOfferModal: FC<ContextModalProps<CreateOfferModalProps>> = ({
  context,
  id,
  innerProps: { offer },
}) => {
  const { t } = useTranslation('modals', { keyPrefix: 'sell' });
  const { account, provider } = useWeb3React();

  const isModification = offer.price !== undefined;

  const { getInputProps, onSubmit, values, isValid, setFieldValue } =
    useForm<SellFormValues>({
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
        buyerAddress: offer?.buyerAddress ?? ZERO_ADDRESS,
        isPrivateOffer: offer?.isPrivateOffer ?? false,
      },
      validate: {
        buyerAddress: (value) =>
          value == account ? t('invalidPrivateOfferAddress') : null,
      },
    });

  const realT = t('realtTokenType');
  const others = t('otherTokenType');
  const data = [
    { value: realT, label: realT },
    { value: others, label: others },
  ];

  const dispatch = useAppDispatch();

  const offers = useAppSelector(selectCreateOffers);
  const [exchangeType, setExchangeType] = useState<string | null>(null);

  const privateOffer = () => {
    if (getInputProps('isPrivateOffer', { type: 'checkbox' }).checked) {
      return (
        <TextInput
          label={t('labelPrivateBuyerAddress')}
          placeholder={t('placeholderOfferPrivatBuyerAddress')}
          required={values.isPrivateOffer}
          disabled={!values.isPrivateOffer}
          error={'Impossible de créér une offre à destination de votre address'}
          {...getInputProps('buyerAddress')}
        />
      );
    } else {
      return;
    }
  };

  const { allowedTokens, properties, buyerTokens, offerTokens } =
    useCreateOfferTokens(
      offer.offerType,
      values.offerTokenAddress,
      values.buyerTokenAddress
    );

  // NEEDED because when offer type is exchange, user cannot exchange token from different type and cannot exchange two same token
  const exchangeOfferTokens =
    exchangeType == realT
      ? properties.filter(
          (property) => property.value != values.buyerTokenAddress
        )
      : allowedTokens.filter(
          (allowedToken) => allowedToken.value != values.buyerTokenAddress
        );
  const exchangeBuyerToken =
    exchangeType == realT
      ? properties.filter(
          (property) => property.value != values.offerTokenAddress
        )
      : allowedTokens.filter(
          (allowedToken) => allowedToken.value != values.offerTokenAddress
        );

  const offerTokenSymbol =
    offerTokens.find((value) => value.value == values.offerTokenAddress)
      ?.label ??
    exchangeOfferTokens.find((value) => value.value == values.offerTokenAddress)
      ?.label;
  const buyTokenSymbol =
    buyerTokens.find((value) => value.value == values.buyerTokenAddress)
      ?.label ??
    exchangeBuyerToken.find((value) => value.value == values.buyerTokenAddress)
      ?.label;
  const total = (values.amount ?? 0) * (values.price ?? 0);

  const { getPropertyToken } = usePropertiesToken();
  const propertyTokenAddress =
    offer.offerType == OFFER_TYPE.BUY
      ? values.buyerTokenAddress
      : values.offerTokenAddress;
  const officialPrice = getPropertyToken
    ? getPropertyToken(propertyTokenAddress)?.officialPrice
    : undefined;
  const officialSellCurrency = getPropertyToken
    ? getPropertyToken(propertyTokenAddress)?.currency
    : undefined;

  const {
    isError: shieldError,
    maxPriceDifference,
    priceDifference,
  } = useShield(offer.offerType, values.price, officialPrice);

  const { bigNumberbalance, balance } = useWalletERC20Balance(
    values.offerTokenAddress
  );

  const createdOffer = async (formValues: SellFormValues) => {
    try {
      if (!provider || !values.amount) return;

      const price =
        offer.offerType !== OFFER_TYPE.BUY
          ? formValues.price
          : formValues.price
          ? 1 / formValues.price
          : undefined;

      const offerToken = getContract<CoinBridgeToken>(
        formValues.offerTokenAddress,
        coinBridgeTokenABI,
        provider,
        account
      );
      const offerTokenDecimals = await offerToken?.decimals();

      let amountInWei;
      if (offer.offerType != OFFER_TYPE.SELL) {
        amountInWei = new BigNumber(total).shiftedBy(
          Number(offerTokenDecimals)
        );
      } else {
        amountInWei = new BigNumber(values?.amount).shiftedBy(
          Number(offerTokenDecimals)
        );
      }

      const createdOffer: CreatedOffer = {
        offerType: offer.offerType,
        offerId: offers.length,
        offerTokenAddress: formValues.offerTokenAddress.toLowerCase(),
        offerTokenDecimal: offerTokenDecimals,
        buyerTokenAddress: formValues.buyerTokenAddress.toLowerCase(),
        price: price ? parseFloat(price.toFixed(6)) : 0,
        amount: amountInWei.toString(),
        buyerAddress: formValues.buyerAddress.toLowerCase(),
        isPrivateOffer: formValues.isPrivateOffer,
      };

      console.log(
        'createOffer/createOfferAdded',
        JSON.stringify(createdOffer, null, 4)
      );

      dispatch({ type: createOfferAddedDispatchType, payload: createdOffer });

      context.closeModal(id);
    } catch (err) {
      console.log(err);
    }
  };

  const closeModal = () => {
    context.closeModal(id);
  };

  const summary = () => {
    if (total && buyTokenSymbol && offerTokenSymbol) {
      if (offer.offerType == OFFER_TYPE.BUY) {
        return (
          <Text size={'md'} mb={10}>
            {t('txBuySummary', {
              amount: values?.amount,
              buyTokenSymbol: buyTokenSymbol,
              price: cleanNumber(values.price ?? 0),
              offerTokenSymbol: offerTokenSymbol,
              total: total.toFixed(6),
            })}
          </Text>
        );
      }

      if (offer.offerType == OFFER_TYPE.SELL) {
        return (
          <Text size={'md'} mb={10}>
            {t('txSellSummary', {
              amount: values?.amount,
              buyTokenSymbol: buyTokenSymbol,
              price: cleanNumber(values.price ?? 0),
              offerTokenSymbol: offerTokenSymbol,
              total: total.toFixed(6),
            })}
          </Text>
        );
      }

      if (offer.offerType == OFFER_TYPE.EXCHANGE) {
        return (
          <Text size={'md'} mb={10}>
            {t('txExchangeSummary', {
              amount: values?.amount,
              buyTokenSymbol: buyTokenSymbol,
              price: cleanNumber(values.price ?? 0),
              offerTokenSymbol: offerTokenSymbol,
              total: total.toFixed(6),
            })}
          </Text>
        );
      }
    } else {
      return undefined;
    }
  };

  const SelectItem = forwardRef<HTMLDivElement, ItemProps>(
    ({ label, value, ...others }: ItemProps, ref) => (
      <Flex ref={ref} {...others} key={value} gap={'sx'} direction={'column'}>
        <Text fz={'sm'} fw={700}>
          {label}
        </Text>
        <Text fz={'xs'} fs={'italic'}>
          {value}
        </Text>
      </Flex>
    )
  );

  const [priceInDollar, setPriceInDollar] = useState<number | ''>('');

  // COMPONENTS
  const getSelect = (
    offerTokenSelectData: SelectItem[],
    buyerTokenSelectData: SelectItem[]
  ) => {
    const selects = [
      <Select
        key={'select-0'}
        label={t('offerTokenAddress')}
        placeholder={t('placeholderOfferSellTokenAddress')}
        searchable={true}
        required={true}
        style={{ width: '100%' }}
        nothingFound={'No property found'}
        itemComponent={SelectItem}
        data={offerTokenSelectData}
        {...getInputProps('offerTokenAddress')}
      />,
      <Select
        key={'select-1'}
        label={t('buyerTokenAddress')}
        placeholder={t('placeholderOfferBuyTokenAddress')}
        searchable={true}
        style={{ width: '100%' }}
        nothingFound={'No property found'}
        itemComponent={SelectItem}
        data={buyerTokenSelectData}
        required={true}
        {...getInputProps('buyerTokenAddress')}
      />,
    ];

    return (
      <>
        {offer.offerType == OFFER_TYPE.BUY ? (
          <>
            {selects[1]}
            {selects[0]}
          </>
        ) : (
          <>
            {selects[0]}
            {selects[1]}
          </>
        )}
      </>
    );
  };
  const PriceNumberInput = ({
    label,
    width,
    onBlur,
  }: {
    label: string;
    width: string;
    onBlur: () => void;
  }) => {
    return (
      <Flex
        direction={'column'}
        gap={'sm'}
        style={{ width: width ? width : '100%' }}
      >
        <NumberInput
          label={label}
          placeholder={t('placeholderPrice')}
          value={priceInDollar}
          onChange={(value) => setPriceInDollar(value)}
          precision={6}
          required={true}
          disabled={false}
          min={0.000001}
          width={width ? width : '100%'}
          max={undefined}
          step={undefined}
          showMax={false}
          sx={{ flexGrow: 1 }}
          onBlur={() => onBlur()}
          error={
            shieldError && priceDifference
              ? t('shieldError', {
                  priceDifference: (priceDifference * 100).toFixed(2),
                  maxPriceDifference: maxPriceDifference * 100,
                })
              : undefined
          }
        />
        {officialPrice && officialSellCurrency ? (
          <Text fz={'sm'} fs={'italic'}>
            {t('officialPriceInfos', { officialPrice, officialSellCurrency })}
          </Text>
        ) : undefined}
      </Flex>
    );
  };

  // EXCHANGE
  const GetExchange = () => {
    useEffect(() => {
      setExchangeType(data[0].value);
    }, []);

    const setE = (value: string) => {
      setFieldValue('offerTokenAddress', '');
      setFieldValue('buyerTokenAddress', '');

      setExchangeType(value);
    };

    return (
      <>
        <Select
          label={t('chooseExchangeTokenType')}
          data={data}
          value={exchangeType}
          onChange={setE}
        />
        <Flex gap={'md'}>
          {getSelect(exchangeOfferTokens, exchangeBuyerToken)}
        </Flex>
      </>
    );
  };
  const GetExchangePriceNumberInputs = () => {
    const [price, setPrice] = useState<number>(1);

    const exchangeOfferTokenSymbol = exchangeOfferTokens.find(
      (value) => value.value == values.offerTokenAddress
    )?.label;
    const exchangeBuyerTokenSymbol = exchangeBuyerToken.find(
      (value) => value.value == values.buyerTokenAddress
    )?.label;

    // const { getPropertyToken } = usePropertiesToken();

    // const exchangeOfferTokenPrice = values.offerTokenAddress ? getPropertyToken(values.offerTokenAddress)?.officialPrice : undefined;
    // const exchangeBuyerTokenPrice = values.buyerTokenAddress ? getPropertyToken(values.buyerTokenAddress)?.officialPrice : undefined;

    useEffect(() => {
      if (price) setFieldValue('price', parseFloat((1 / price).toFixed(6)));
    }, [price]);

    return (
      <Flex direction={'column'}>
        <Text fw={700} fz={'md'}>
          {t('priceComputingTitle')}
        </Text>
        {exchangeOfferTokenSymbol && exchangeBuyerTokenSymbol ? (
          <>
            <Text mb={'md'}>
              {t('priceComputing', {
                exchangeBuyerTokenSymbol,
                exchangeOfferTokenSymbol,
              })}
            </Text>
            <Flex gap={'md'}>
              <Flex gap={9} direction={'column'} style={{ width: '100%' }}>
                <MantineInput
                  hideControls={true}
                  label={exchangeOfferTokenSymbol}
                  precision={6}
                  value={1}
                  disabled={true}
                  style={{ width: '100%' }}
                />
              </Flex>
              <IconArrowRight style={{ marginTop: '22px' }} size={46} />
              <Flex gap={9} direction={'column'} style={{ width: '100%' }}>
                <MantineInput
                  hideControls={true}
                  label={exchangeBuyerTokenSymbol}
                  precision={6}
                  value={price ?? 0}
                  style={{ width: '100%' }}
                  onChange={(price) => setPrice(price ? price : 1)}
                />
              </Flex>
            </Flex>
            <Text>{`1 "${exchangeBuyerTokenSymbol}" = ${(1 / price).toFixed(
              3
            )} "${exchangeOfferTokenSymbol}"`}</Text>
          </>
        ) : (
          <Skeleton width={'100%'} height={100} mt={5} />
        )}
      </Flex>
    );
  };

  // BUY and SELL
  const GetPriceNumberInputs = () => {
    const tokenSymbol =
      offer.offerType == OFFER_TYPE.BUY
        ? offerTokens.find((token) => token.value == values.offerTokenAddress)
            ?.label
        : buyerTokens.find((token) => token.value == values.buyerTokenAddress)
            ?.label;

    const { price } = useOraclePriceFeed(
      offer.offerType == OFFER_TYPE.BUY
        ? values.offerTokenAddress
        : values.buyerTokenAddress
    );

    const setPInDollar = () => {
      if (values.price && price)
        setPriceInDollar(
          parseFloat(new BigNumber(values.price).multipliedBy(price).toString())
        );
    };

    const setPrice = () => {
      if (price && priceInDollar) {
        setFieldValue(
          'price',
          truncDigits(
            parseFloat(
              new BigNumber(priceInDollar).dividedBy(price).toString()
            ),
            6
          )
        );
      }
    };

    return (
      <Flex gap={10} align={'start'}>
        {PriceNumberInput({
          label: t('priceInCurrency', { currency: '$' }),
          width: '100%',
          onBlur: setPrice,
        })}
        <IconArrowsHorizontal style={{ marginTop: '22px' }} size={46} />
        <Flex direction={'column'} gap={'sm'} style={{ width: '100%' }}>
          <MantineInput
            hideControls={true}
            label={t('convertBuyPrice', {
              buyerTokenSymbol: tokenSymbol,
              prep: t('in'),
            })}
            precision={6}
            {...getInputProps('price')}
            style={{ width: '100%' }}
            onBlur={() => setPInDollar()}
          />
          {tokenSymbol && price ? (
            <Text fz={'sm'} fs={'italic'}>
              {t('withPrice', {
                buyerTokenSymbol: tokenSymbol,
                price: price.toString(),
                currency: '$',
              })}
            </Text>
          ) : undefined}
        </Flex>
      </Flex>
    );
  };

  return (
    <Flex
      direction={'column'}
      mx={'auto'}
      gap={'md'}
      sx={{ padding: '1rem', paddingTop: 0, marginTop: '-20px' }}
    >
      <Flex
        style={{
          justifyContent: 'space-between',
          alignItems: 'center',
          height: '50px',
        }}
      >
        <Flex gap={'sm'} align={'center'}>
          <OfferTypeBadge offerType={offer.offerType} />
          <h3 style={{ margin: 0 }}>{t('titleFormCreateOffer')}</h3>
        </Flex>
        {offer.offerType !== OFFER_TYPE.EXCHANGE ? <Shield /> : undefined}
      </Flex>
      <form onSubmit={onSubmit(createdOffer)}>
        <Stack justify={'center'} align={'stretch'}>
          {offer.offerType == OFFER_TYPE.EXCHANGE
            ? GetExchange()
            : getSelect(offerTokens, buyerTokens)}

          {offer.offerType == OFFER_TYPE.EXCHANGE
            ? GetExchangePriceNumberInputs()
            : GetPriceNumberInputs()}

          <Divider />
          <WalletERC20Balance balance={balance} symbol={offerTokenSymbol} />

          <NumberInput
            label={
              offer.offerType == OFFER_TYPE.EXCHANGE
                ? t('exchangeAmount')
                : t('amount')
            }
            placeholder={t('placeholderAmount')}
            required={true}
            precision={6}
            min={0.000001}
            setFieldValue={setFieldValue}
            showMax={false}
            sx={{ flexGrow: 1 }}
            {...getInputProps('amount')}
          />

          <Checkbox
            mt={'md'}
            label={t('checkboxLabelPrivateOffre')}
            {...getInputProps('isPrivateOffer', { type: 'checkbox' })}
          />

          {privateOffer()}

          <MatchedOffers
            offerType={offer.offerType}
            offerTokenAddress={values.offerTokenAddress}
            buyerTokenAddress={values.buyerTokenAddress}
            price={values.price}
            amount={values.amount}
            closeModal={closeModal}
          />

          <Group position={'left'} mt={'md'}>
            <>
              {summary()}
              <Button
                type={'submit'}
                aria-label={'submit'}
                loading={bigNumberbalance && bigNumberbalance == undefined}
                disabled={!isValid || shieldError}
              >
                {t('buttonCreateOffer')}
              </Button>
            </>
          </Group>
        </Stack>
      </form>
    </Flex>
  );
};
