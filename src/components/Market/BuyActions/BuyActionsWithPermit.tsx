import { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Group, Popover, Text, ActionIcon } from '@mantine/core';
import { useModals } from '@mantine/modals';
import { IconShoppingCart } from '@tabler/icons';
import { useWeb3React } from '@web3-react/core';

import { Offer } from 'src/types/offer/Offer';
import { PropertiesToken } from '../../../types';
import { getNotWhitelistedTokens } from '../../../utils/whitelist';
import { useProperties } from '../../../hooks/interface/useProperties';
import { useWlProperties } from '../../../hooks/interface/useWlProperties';
import { useOffers } from '../../../hooks/interface/useOffers';

type BuyActions = {
  buyOffer: Offer | undefined;
  loading?: boolean;
  buttonClassName?: string;
  groupClassName?: string;
};

export const BuyActionsWithPermit: FC<BuyActions> = ({
  buyOffer,
  loading,
  buttonClassName,
  groupClassName
}) => {
  const { account } = useWeb3React();
  const modals = useModals();

  const { properties } = useProperties();

  const { wlProperties } = useWlProperties();
  const { offersAreLoading } = useOffers();

  const isLoading = loading || offersAreLoading;

  const { t } = useTranslation('modals');
  const { t: t1 } = useTranslation('buy', { keyPrefix: 'table' });

  const { refetch: refreshOffers } = useOffers();

  const onOpenBuyModal = useCallback(
    (offer: Offer) => {
      modals.openContextModal('buyPermit', {
        title: <Text>{t('buy.title')}</Text>,
        size: "lg",
        innerProps: {
          offer: offer,
          triggerTableRefresh: refreshOffers,
        },
      });
    },
    [modals, refreshOffers, t]
  );

  const onOpenWalletModal = useCallback(() => {
    modals.openContextModal('wallet', {
      title: <Text>{t('wallet.title')}</Text>,
      innerProps: {},
    });
  }, [modals, t]);

  const [tokenNotWhitelisted, setTokenNotWhitelisted] = useState<PropertiesToken[]>([]);
  useEffect(() => {
    if(!wlProperties || !buyOffer || !properties) return;
    const notWlTokens = getNotWhitelistedTokens(wlProperties, buyOffer, properties);
    setTokenNotWhitelisted(notWlTokens);
  }, [wlProperties, buyOffer, properties]);

  const isAccountOffer = useMemo(() => {
    if(!buyOffer || !account) return false;
    return buyOffer.sellerAddress == account.toLowerCase()
  },[buyOffer, account])

  const cannotBuy = useMemo(() => {
    if(!buyOffer || !account) return false;
    return isAccountOffer || buyOffer == undefined
  },[buyOffer, account])

  const [opened, setOpened] = useState(false);
  const hovered = useCallback((state: boolean) => {
    if(tokenNotWhitelisted.length > 0) setOpened(true)
    if(isAccountOffer) setOpened(true)
  },[tokenNotWhitelisted, isAccountOffer])

  return (
    <>
      { !isLoading ? (
        <Popover 
          opened={opened}
          onChange={setOpened}
          width={300} 
          position="top" 
          withArrow
          shadow="md"
        >
          <Popover.Target>
            <Group 
              justify={'center'}
              className={groupClassName ?? ""}
              onMouseEnter={() => hovered(true)}
              onMouseLeave={() => hovered(false)}
            >
              <ActionIcon
                color={'green'}
                onClick={() =>
                  account && buyOffer ? onOpenBuyModal(buyOffer) : onOpenWalletModal()
                }
                className={buttonClassName ?? ""}
                disabled={tokenNotWhitelisted.length > 0 || !buyOffer || cannotBuy}
                style={{ width: '100%' }}
              >
                <IconShoppingCart size={16} aria-label={'Buy'} />
              </ActionIcon>
              {/* "Cannot buy your own offer" */}
            </Group> 
          </Popover.Target>
          <Popover.Dropdown>
            {tokenNotWhitelisted.length > 0 ? (
              <>
                <Text>{t1('notWhitelisted')}</Text>
                <ul>
                  {tokenNotWhitelisted.length > 0 && tokenNotWhitelisted.map((token, index) => (
                    <li key={`not-wl-${index}`}><Text>{token.shortName}</Text></li>
                  ))}
                </ul>
              </>
            ) : isAccountOffer ? (
              <Text>{t1('cannotBuyYourOffer')}</Text>
            ) : undefined}
          </Popover.Dropdown>
        </Popover>
      ): undefined }
    </>
  );
};