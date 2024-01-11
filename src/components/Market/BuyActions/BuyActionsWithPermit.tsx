import { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { ActionIcon, Group, Title, Popover, Text, Flex } from '@mantine/core';
import { useModals } from '@mantine/modals';
import { IconShoppingCart } from '@tabler/icons';
import { useWeb3React } from '@web3-react/core';

import { Offer } from 'src/types/offer/Offer';
import { useRefreshOffers } from 'src/hooks/offers/useRefreshOffers';
import { PropertiesToken } from '../../../types';
import { getNotWhitelistedTokens } from '../../../utils/whitelist';
import { useRootStore } from '../../../zustandStore/store';

type BuyActions = {
  buyOffer: Offer;
  buttonClassName?: string;
  groupClassName?: string;
};

export const BuyActionsWithPermit: FC<BuyActions> = ({
  buyOffer,
  buttonClassName,
  groupClassName
}) => {
  const { account } = useWeb3React();
  const modals = useModals();

  const [
    wlProperties,
    properties,
    offersAreLoading
  ] = useRootStore((state) => [
    state.wlProperties,
    state.properties,
    state.offersAreLoading
  ])

  const { t } = useTranslation('modals');
  const { t: t1 } = useTranslation('buy', { keyPrefix: 'table' });

  const { refreshOffers } = useRefreshOffers();

  const onOpenBuyModal = useCallback(
    (offer: Offer) => {
      modals.openContextModal('buyPermit', {
        title: <Title order={3}>{t('buy.title')}</Title>,
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
      title: <Title order={3}>{t('wallet.title')}</Title>,
      innerProps: {},
    });
  }, [modals, t]);

  const isAccountOffer: boolean = useMemo(() => {
    if(!buyOffer || !account) return false;
    return buyOffer.sellerAddress == account.toLowerCase()
  },[buyOffer, account]);

  const [opened, setOpened] = useState(false);
  const [tokenNotWhitelisted, setTokenNotWhitelisted] = useState<PropertiesToken[]>([]);
  useEffect(() => {
    if(!wlProperties) return;

    let notWlTokens = getNotWhitelistedTokens(wlProperties, buyOffer, properties);
    setTokenNotWhitelisted(notWlTokens);

  }, [wlProperties]);

  return (
    <>
      { !offersAreLoading ? 
        (
          <Popover 
            opened={opened}
            onChange={setOpened}
            width={200} 
            position="top" 
            withArrow
            shadow="md"
          >
            <Popover.Target>
              <Group 
                justify={'center'}
                className={groupClassName ?? ""}
                onMouseEnter={() => { if(tokenNotWhitelisted.length > 0) setOpened(true) }}
                onMouseLeave={() => { setOpened(false) }}
              >
                {!isAccountOffer ? (
                  <ActionIcon
                    color={'green'}
                    onClick={() =>
                      account ? onOpenBuyModal(buyOffer) : onOpenWalletModal()
                    }
                    className={buttonClassName ?? ""}
                    disabled={tokenNotWhitelisted.length > 0}
                  >
                    <IconShoppingCart size={16} aria-label={'Buy'} />
                  </ActionIcon>
                ): (
                  <ActionIcon disabled={true} variant={"transparent"}/>
                )}
              </Group> 
            </Popover.Target>
            <Popover.Dropdown>
              <Flex>
                <Text>{t1('notWhitelisted')}</Text>
              </Flex>
              <ul>
                {tokenNotWhitelisted.length > 0 && tokenNotWhitelisted.map((token) => (
                  <li><Text>{token.shortName}</Text></li>
                ))}
              </ul>
            </Popover.Dropdown>
          </Popover>
        ): undefined }
    </>
  );
};