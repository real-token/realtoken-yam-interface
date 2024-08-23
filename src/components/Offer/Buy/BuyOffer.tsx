import { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Web3Provider } from '@ethersproject/providers';
import { Button, Flex, Stack } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { useWeb3React } from '@web3-react/core';

import BigNumber from 'bignumber.js';
import { useAtomValue } from 'jotai';

import { Erc20, Erc20ABI } from 'src/abis';
import { ContractsID } from 'src/constants';
import { useActiveChain, useContract } from 'src/hooks';
import { useERC20TokenInfo } from 'src/hooks/useERC20TokenInfo';
import { useWalletERC20Balance } from 'src/hooks/useWalletERC20Balance';
import { providerAtom } from 'src/states';
import { OFFER_TYPE, Offer } from 'src/types/offer';
import { getContract } from 'src/utils';

import { buy } from 'src/utils/tx/buy';

import { OfferContainer } from '../components/OfferContainer';
import { ModalSuccess } from './ModalSuccess';
import OfferSummary from './OfferSummary';
import TokenExchange from './components/TokenExchange';

import { TransactionViewAccordion } from '../components/TransactionListView';
import 'cleansatmining-simulator/dist/simulator.css';
import { Simulator, SimulationProductData } from 'cleansatmining-simulator';
import { SimulatorButton } from '../components/SimulatorButton';

interface FarmOverview {
  networkExaHashrate: number;
  bitcoinValue: number;
  networkTransactionFees: number;
  asicsHashrate: number;
  asicsPower: number;
  electricityPriceKwh: number;
  containerUnitNumber: number;
  operatorFeesRate: number;
  csmFeesRate: number;
  csmOperationalFeesRate: number;
  poolFees: number;
  isRate: number;
  asics: number;
  vat: number;
  miscellaneousEquipment: number;
  totalInvestment: number;
  provisionRate: number;
}

interface BuyOffertProps {
  offer: Offer;
  backArrow?: boolean;
  setSimulator?: React.Dispatch<React.SetStateAction<React.ReactNode>>;
  toggleSimulator?: () => void;
}

type BuyOfferFormValues = {
  offerId: string;
  price: number;
  amount: number;
  amountCurrency: number;
  offerTokenAddress: string;
  offerTokenDecimals: number;
  buyerTokenAddress: string;
  buyerTokenDecimals: number;
};

export const BuyOffer: FC<BuyOffertProps> = ({ offer, backArrow }) => {
  const { t } = useTranslation('list');
  const [sideElement, setSideElement] = useState<React.ReactNode | undefined>(
    undefined,
  );
  const [sideOpened, { toggle: toggleSide, close: closeSide }] =
    useDisclosure(false);
  return (
    <OfferContainer
      offer={offer}
      backArrow={backArrow}
      action={
        offer.type === OFFER_TYPE.EXCHANGE
          ? t('toExchange')
          : offer.type === OFFER_TYPE.BUY
            ? t('toSell')
            : t('toBuy')
      }
      side={sideElement}
      isSideOpen={sideOpened}
      closeSide={closeSide}
    >
      <BuyOfferForms
        offer={offer}
        setSimulator={setSideElement}
        toggleSimulator={toggleSide}
      ></BuyOfferForms>
    </OfferContainer>
  );
};

const BuyOfferForms: FC<BuyOffertProps> = ({
  offer,
  setSimulator: setSideElement,
  toggleSimulator: toggleSide,
}) => {
  const { t: tswap } = useTranslation('swap');

  const [
    modalFinishOpened,
    { open: modalFinishOpen, close: modalFinishClose },
  ] = useDisclosure(false);
  const { account, provider } = useWeb3React();
  const { getInputProps, onSubmit, setFieldValue, values } =
    useForm<BuyOfferFormValues>({
      initialValues: {
        offerId: offer.offerId,
        price: parseFloat(offer.price),
        amount: 0,
        amountCurrency: 0,
        offerTokenAddress: offer.offerTokenAddress,
        offerTokenDecimals: parseFloat(offer.offerTokenDecimals),
        buyerTokenAddress: offer.buyerTokenAddress,
        buyerTokenDecimals: parseFloat(offer.buyerTokenDecimals),
      },
    });
  const [buyAmount, setBuyAmount] = useState<number>(0);
  const [isSubmitting, setSubmitting] = useState<boolean>(false);
  const activeChain = useActiveChain();
  const [offerTokenSellerBalance, setOfferTokenSellerBalance] = useState<
    string | undefined
  >('');

  const {
    symbol: offerTokenSymbol,
    logoUrl: offerTokenLogo,
    decimals: offerTokenDecimals,
  } = useERC20TokenInfo(offer.offerTokenAddress);
  const { address: buyerTokenAddress } = useERC20TokenInfo(
    offer.buyerTokenAddress,
  );

  const realTokenYamUpgradeable = useContract(
    ContractsID.realTokenYamUpgradeable,
  );
  const offerToken = getContract<Erc20>(
    offer.offerTokenAddress,
    Erc20ABI,
    provider as Web3Provider,
    account,
  );

  const [productData, setProductData] = useState<
    SimulationProductData | undefined
  >(undefined);

  useEffect(() => {
    if (setSideElement && productData) {
      setSideElement(
        <div style={{ marginTop: '-20px' }}>
          <Simulator
            amountInvested={getUsdAmount(offer, values)}
            productData={productData}
            displayLogs={false}
          />
        </div>,
      );
    }
  }, [values, productData]);

  useEffect(() => {
    const getOfferTokenInfos = async () => {
      if (!offerToken) return;
      try {
        const balanceSeller = await offerToken.balanceOf(offer.sellerAddress);
        setOfferTokenSellerBalance((balanceSeller ?? BigNumber(0)).toString());
      } catch (err) {
        console.error(err);
      }
    };

    if (offerToken) getOfferTokenInfos();
  }, [offerToken]);

  useEffect(() => {
    const fetchApiData = async () => {
      try {
        const id = offer.sites.selling.id;
        const priceRate = new BigNumber(offer.price)
          .dividedBy(offer.officialPrice ?? 1)
          .toNumber();
        const response = await fetch(`/api/sites/${id}/overview`);
        const data: FarmOverview = await response.json();
        const product: SimulationProductData = {
          asics: data.asics,
          asicsHashrate: data.asicsHashrate,
          asicsPower: data.asicsPower,
          bitcoinValueForSimulation: Math.round(data.bitcoinValue),
          containerUnitNumber: 1,
          csmFeesRate: data.csmFeesRate,
          csmOperationalFeesRate: data.csmOperationalFeesRate,
          electricityPriceKwh: data.electricityPriceKwh,
          isRate: 0,
          miscellaneousEquipment: data.miscellaneousEquipment,
          networkExaHashrate: Math.round(data.networkExaHashrate),
          networkTransactionFees: data.networkTransactionFees,
          operatorFeesRate: data.operatorFeesRate,
          poolFees: data.poolFees,
          priceRate: priceRate,
          provisionRate: data.provisionRate,
          simulatorSiteUptime: 0.9,
          totalInvestment: data.totalInvestment,
          vat: 0,
          maxInvestmentAmount: new BigNumber(offer.amount)
            .times(offer.price)
            .toNumber(),
          minInvestmentAmount: 0,
        };

        setProductData(product);
      } catch (err) {
        console.error('Simulator: Failed to fetch API data:', err);
      }
    };

    fetchApiData();
  }, []);

  const { balance } = useWalletERC20Balance(buyerTokenAddress);
  const connector = useAtomValue(providerAtom);

  const onHandleSubmit = useCallback(
    async (formValues: BuyOfferFormValues) => {
      setBuyAmount(formValues.amount);
      console.log('setBuyAmount', formValues.amount);
      const onFinished = () => {
        setSubmitting(false);
        formValues.amount = 0;
        modalFinishOpen();
      };
      setSubmitting(true);

      buy(
        account,
        provider,
        activeChain,
        realTokenYamUpgradeable,
        offer,
        formValues.amount,
        connector,
        setSubmitting,
        onFinished,
      );
    },
    [account, provider, activeChain, realTokenYamUpgradeable, offer, connector],
  );

  const maxTokenBuy: number | undefined = useMemo(() => {
    if (!balance || !offer.price) return undefined;

    const b = new BigNumber(balance);
    const max = b.eq(0) ? new BigNumber(0) : b.dividedBy(offer.price);

    return max.isGreaterThanOrEqualTo(new BigNumber(offer.amount))
      ? new BigNumber(offer.amount).toNumber()
      : parseFloat(max.toString());
  }, [balance, offer]);

  return (
    <>
      <ModalSuccess
        buyAmount={buyAmount}
        offerTokenAddress={offer.offerTokenAddress}
        offerTokenDecimals={
          offerTokenDecimals
            ? parseInt(offerTokenDecimals)
            : parseInt(offer.offerTokenDecimals)
        }
        offerTokenSymbol={offerTokenSymbol ?? offer.offerTokenName}
        offerTokenLogoUrl={offerTokenLogo ?? ''}
        modalFinishClose={modalFinishClose}
        modalFinishOpened={modalFinishOpened}
      ></ModalSuccess>

      <form onSubmit={onSubmit(onHandleSubmit)}>
        <Stack justify={'center'} align={'stretch'} spacing={5}>
          <Flex direction={'column'} gap={'sm'} mb={10}>
            <TokenExchange
              buyerTokenBalance={balance ?? '0'}
              sellerTokenBalance={offerTokenSellerBalance ?? '0'}
              getInputProps={getInputProps}
              maxTokenBuy={maxTokenBuy ?? 0}
              offer={offer}
              price={values?.price ?? 0}
              setFieldValue={setFieldValue}
            ></TokenExchange>
            <OfferSummary
              offer={offer}
              sellerTokenBalance={offerTokenSellerBalance ?? '0'}
            ></OfferSummary>
          </Flex>

          {(offer.type === OFFER_TYPE.BUY || offer.type === OFFER_TYPE.SELL) &&
            toggleSide &&
            productData !== undefined && (
              <SimulatorButton toggle={toggleSide}></SimulatorButton>
            )}
          <TransactionViewAccordion
            offerId={offer.offerId}
            isSmall={true}
          ></TransactionViewAccordion>
          <Button
            mt={10}
            h={48}
            type={'submit'}
            radius={'md'}
            loading={isSubmitting}
            aria-label={tswap('confirm')}
            disabled={
              process.env.NEXT_PUBLIC_ENV === 'development'
                ? false
                : values?.amount == 0 || !values.amount
            }
          >
            {tswap('confirm')}
          </Button>
        </Stack>
      </form>
    </>
  );
};
function getUsdAmount(offer: Offer, values: BuyOfferFormValues): number {
  return offer.type === OFFER_TYPE.BUY ? values.amount : values.amountCurrency;
}
