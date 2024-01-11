import { Flex, Skeleton, Text } from "@mantine/core"
import { IconWallet } from "@tabler/icons"
import React from "react";
import { FC } from "react"
import { useTranslation } from "react-i18next";
import styled from 'styled-components';
import classes from './WalletERC20Balance.module.css';

interface Param{
  $isLoading: boolean;
}
const BalanceContainer = styled('div')<Param>`
  display: flex;
  flex-direction: column;
  row-gap: ${({ $isLoading }) => $isLoading ? '3px' : '3px' };
  width: 100%;
`;

type WalletERC20BalanceProps = {
    balance: string|undefined
    symbol: string|undefined
}

export const WalletERC20Balance: FC<WalletERC20BalanceProps> = ({ balance, symbol }) => {

    const { t } = useTranslation("components",{ keyPrefix: 'walletBalance' });

    return(
      <Flex direction={'column'} gap={'xs'}>
          <Text>{t("title")}</Text>
          <div className={classes.container}>
              <div className={classes.wallet}><IconWallet color={"white"} size={24}/></div>
              <BalanceContainer $isLoading={!balance && !symbol}>
                <Text fw={700}>{ symbol ? `${symbol}` : <Skeleton width={"100%"} height={20} color={"brand"}/>}</Text>
                <Text className={classes.balance}>{balance ? balance : <Skeleton width={"100%"} height={15} color={"brand"}/>}</Text>
              </BalanceContainer>
          </div>
      </Flex>
    )
    
}