import {
  Dispatch,
  FC,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useTranslation } from 'react-i18next';

import { Web3Provider } from '@ethersproject/providers';
import {
  BackgroundImage,
  Badge,
  Box,
  Button,
  Center,
  CloseButton,
  Divider,
  Flex,
  Group,
  Stack,
  Text,
  createStyles,
  em,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { useMediaQuery } from '@mantine/hooks';
import { useWeb3React } from '@web3-react/core';

import BigNumber from 'bignumber.js';
import { useAtomValue } from 'jotai';

import { Erc20, Erc20ABI } from 'src/abis';
import { NumberInput } from 'src/components/NumberInput';
import { ContractsID } from 'src/constants';
import { useActiveChain, useContract } from 'src/hooks';
import { useAppDispatch } from 'src/hooks/react-hooks';
import { useERC20TokenInfo } from 'src/hooks/useERC20TokenInfo';
import { usePropertiesToken } from 'src/hooks/usePropertiesToken';
import { useWalletERC20Balance } from 'src/hooks/useWalletERC20Balance';
import { providerAtom } from 'src/states';
import { buyOfferClose } from 'src/store/features/buyOffer/buyOfferSlice';
import { OFFER_TYPE, Offer } from 'src/types/offer';
import { OFFER_SELLER } from 'src/types/offer/OfferType';
import { getContract } from 'src/utils';
import { cleanNumber } from 'src/utils/number';
import { calcRem } from 'src/utils/style';
import { buy } from 'src/utils/tx/buy';

const useStyle = createStyles((theme) => ({
  container: {
    fontSize: theme.fontSizes.sm,
    display: 'inline-block',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },

  textHeader: {
    textAlign: 'left',
    fontSize: theme.fontSizes.sm,
    color:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[2]
        : theme.colors.gray[6],
  },
  textValue: {
    fontWeight: 600,
    fontSize: theme.fontSizes.sm,
    color: theme.colorScheme === 'dark' ? undefined : theme.colors.gray[8],
  },
}));

interface BuyWithPermitProps {
  offer: Offer;
  triggerTableRefresh?: Dispatch<SetStateAction<boolean>>;
}

type BuyWithPermitFormValues = {
  offerId: string;
  price: number;
  amount: number;
  offerTokenAddress: string;
  offerTokenDecimals: number;
  buyerTokenAddress: string;
  buyerTokenDecimals: number;
};

export const BuyWithPermit: FC<BuyWithPermitProps> = ({
  offer,
  triggerTableRefresh,
}) => {
  const isMobile = useMediaQuery(`(max-width: ${em(750)})`);
  const { classes } = useStyle();
  const { account, provider } = useWeb3React();
  const dispatch = useAppDispatch();
  const { getInputProps, onSubmit, reset, setFieldValue, values } =
    useForm<BuyWithPermitFormValues>({
      // eslint-disable-next-line object-shorthand
      initialValues: {
        offerId: offer.offerId,
        price: parseFloat(offer.price),
        amount: 0,
        offerTokenAddress: offer.offerTokenAddress,
        offerTokenDecimals: parseFloat(offer.offerTokenDecimals),
        buyerTokenAddress: offer.buyerTokenAddress,
        buyerTokenDecimals: parseFloat(offer.buyerTokenDecimals),
      },
    });
  const [isSubmitting, setSubmitting] = useState<boolean>(false);
  const activeChain = useActiveChain();

  const [offerTokenSellerBalance, setOfferTokenSellerBalance] = useState<
    string | undefined
  >('');
  const { name: offerTokenName, symbol: offerTokenSymbol } = useERC20TokenInfo(
    offer.offerTokenAddress
  );
  const { symbol: buyTokenSymbol, address: buyerTokenAddress } =
    useERC20TokenInfo(offer.buyerTokenAddress);

  const realTokenYamUpgradeable = useContract(
    ContractsID.realTokenYamUpgradeable
  );
  const offerToken = getContract<Erc20>(
    offer.offerTokenAddress,
    Erc20ABI,
    provider as Web3Provider,
    account
  );
  const getOfferTokenInfos = async () => {
    if (!offerToken) return;
    try {
      // console.log("offerToken: ", offerToken)
      // console.log("sellerAddress: ", sellerAddress)
      const balanceSeller = await offerToken.balanceOf(offer.sellerAddress);
      setOfferTokenSellerBalance((balanceSeller ?? BigNumber(0)).toString());
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    if (offerToken) getOfferTokenInfos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [offerToken]);

  const { t } = useTranslation('modals', { keyPrefix: 'buy' });
  const { t: t1 } = useTranslation('modals', { keyPrefix: 'sell' });
  const { t: t2 } = useTranslation('modals', { keyPrefix: 'offer' });
  const { t: t3 } = useTranslation('buy', { keyPrefix: 'table' });

  const { balance, WalletERC20Balance } =
    useWalletERC20Balance(buyerTokenAddress);

  const total = values?.amount * values?.price;

  const connector = useAtomValue(providerAtom);

  const onHandleSubmit = useCallback(
    async (formValues: BuyWithPermitFormValues) => {
      const onFinished = () => {
        //onClose();
        if (triggerTableRefresh) triggerTableRefresh(true);
      };

      buy(
        account,
        provider,
        activeChain,
        realTokenYamUpgradeable,
        offer,
        formValues.amount,
        connector,
        setSubmitting,
        onFinished
      );
    },
    [
      account,
      provider,
      activeChain,
      realTokenYamUpgradeable,
      offer,
      connector,
      //onClose,
      triggerTableRefresh,
    ]
  );

  const maxTokenBuy: number | undefined = useMemo(() => {
    if (!balance || !offer.price) return undefined;

    const b = new BigNumber(balance);
    const max = b.eq(0) ? new BigNumber(0) : b.dividedBy(offer.price);

    return max.isGreaterThanOrEqualTo(new BigNumber(offer.amount))
      ? new BigNumber(offer.amount).toNumber()
      : parseFloat(max.toString());
  }, [balance, offer]);

  const priceTranslation: Map<OFFER_TYPE, string> = new Map<OFFER_TYPE, string>(
    [
      [OFFER_TYPE.BUY, t('buyOfferTypePrice')],
      [OFFER_TYPE.SELL, t('sellOfferTypePrice')],
      [OFFER_TYPE.EXCHANGE, t('exchangeOfferTypePrice')],
    ]
  );

  const amountTranslation: Map<OFFER_TYPE, string> = new Map<
    OFFER_TYPE,
    string
  >([
    [OFFER_TYPE.BUY, t('buyOfferTypeAmount')],
    [OFFER_TYPE.SELL, t('sellOfferTypeAmount')],
    [OFFER_TYPE.EXCHANGE, t('exchangeOfferTypeAmount')],
  ]);

  const onClose = useCallback(() => {
    dispatch({ type: buyOfferClose, payload: offer });
    reset();
  }, [reset]);

  const { getPropertyToken, propertiesIsloading } = usePropertiesToken();
  const offerProperty = getPropertyToken(offer.buyerTokenAddress);
  const [backgroundImage, setBackgroundImage] = useState<string>(
    offerProperty ? offerProperty.imageLink[0] : ''
  );
  useEffect(() => {
    if (!offer || propertiesIsloading) return undefined;

    if (offer.buyerTokenType == 1) {
      const offerProperty = getPropertyToken(offer.buyerTokenAddress);
      if (offerProperty) {
        setBackgroundImage(offerProperty.imageLink[0]);
      }
    }

    if (offer.offerTokenType == 1) {
      const offerProperty = getPropertyToken(offer.offerTokenAddress);
      if (offerProperty) {
        setBackgroundImage(offerProperty.imageLink[0]);
      }
    }
  }, [getPropertyToken, offer, propertiesIsloading]);

  console.log(
    'Offer property',
    JSON.stringify(offerProperty, null, 4),
    offer.buyerTokenAddress
  );

  return (
    <div
      style={{
        justifyContent: 'left',
        alignItems: 'left',
        textAlign: 'center',
      }}
    >
      <form
        onSubmit={onSubmit(onHandleSubmit)}
        style={{
          width: isMobile ? '100%' : calcRem(500),
        }}
        className={classes.container}
      >
        <Box mx='auto' sx={{ marginBottom: '10px' }}>
          <BackgroundImage src={backgroundImage} radius='md'>
            <Group position={'apart'}>
              <Badge
                color='red'
                variant='filled'
                radius='md'
                sx={{ height: '22px' }}
              >
                {t1('sell')}
              </Badge>
              <CloseButton onClick={onClose} />
            </Group>
            <Center p='md'>
              <Badge color='lime' variant='filled' radius='md' size={'lg'}>
                {t2('title') + ' ' + offer.offerId}
              </Badge>
              {/* <Flex direction={'row'} gap={16}>
                <Text className={classes.textHeader}>{t('offerId')}</Text>
                <Text className={classes.textValue}>{offer.offerId}</Text>
              </Flex> */}
            </Center>
          </BackgroundImage>
        </Box>
        <Stack justify={'center'} align={'stretch'}>
          <Flex direction={'column'} gap={'sm'}>
            {/* <Text size={'md'}>{t('selectedOffer')}</Text> */}
            <Flex direction={'column'} gap={8}>
              <Flex direction={'row'} gap={16}>
                <Text className={classes.textHeader}>
                  {t('offerTokenName')}
                </Text>
                <Text className={classes.textValue}>{offerTokenName}</Text>
              </Flex>
              {
                <Flex direction={'row'} gap={16}>
                  <Text className={classes.textHeader}>{t3('sellerName')}</Text>
                  <Text className={classes.textValue}>
                    {t3(offer.sellerName)}
                  </Text>
                </Flex>
              }
              {
                <Flex direction={'row'} gap={16}>
                  <Text className={classes.textHeader}>
                    {t('sellerAddress')}
                  </Text>
                  <Text className={classes.textValue}>
                    {offer.sellerAddress}
                  </Text>
                </Flex>
              }
              <Flex direction={'row'} gap={16}>
                <Text className={classes.textHeader}>
                  {offer.type ? amountTranslation.get(offer.type) : ''}
                </Text>
                <Text className={classes.textValue}>
                  {BigNumber.minimum(
                    offer.amount,
                    offerTokenSellerBalance!
                  ).toString()}
                </Text>
              </Flex>
              <Flex direction={'row'} gap={16}>
                <Text className={classes.textHeader}>
                  {offer.type ? priceTranslation.get(offer.type) : ''}
                </Text>
                <Text
                  className={classes.textValue}
                >{`${offer.price} ${buyTokenSymbol}`}</Text>
              </Flex>
            </Flex>
          </Flex>

          <Divider />

          <WalletERC20Balance
            tokenAddress={offer.buyerTokenAddress}
            tokenDecimals={offer.buyerTokenDecimals}
          />

          <Flex direction={'column'} gap={'sm'}>
            <Text size={'md'} ta={'left'}>
              {t1('sell')}
            </Text>
            <Flex direction={'column'} gap={8}>
              <NumberInput
                label={t('amount')}
                required={true}
                // disabled={maxTokenBuy == 0 || maxTokenBuy == undefined}
                min={0}
                max={maxTokenBuy}
                showMax={true}
                placeholder={t('amount')}
                sx={{ flexGrow: 1 }}
                groupMarginBottom={16}
                setFieldValue={setFieldValue}
                {...getInputProps('amount')}
              />

              <Text size={'md'}>{t('summary')}</Text>
              <Text mb={10}>
                {` ${t('summaryText1')} ${
                  values?.amount
                } ${offerTokenSymbol} ${t('summaryText2')} ${cleanNumber(
                  values?.price
                )} ${buyTokenSymbol} ${t(
                  'summaryText3'
                )} ${total} ${buyTokenSymbol}`}
              </Text>

              <Group grow={true}>
                <Button
                  color={'red'}
                  onClick={onClose}
                  aria-label={t('cancel')}
                >
                  {t('cancel')}
                </Button>
                <Button
                  type={'submit'}
                  loading={isSubmitting}
                  aria-label={t('confirm')}
                  disabled={
                    process.env.NEXT_PUBLIC_ENV == 'development'
                      ? false
                      : values?.amount == 0 || !values.amount
                  }
                >
                  {t('confirm')}
                </Button>
              </Group>
            </Flex>
          </Flex>
        </Stack>
      </form>
    </div>
  );
};
export default BuyWithPermit;
