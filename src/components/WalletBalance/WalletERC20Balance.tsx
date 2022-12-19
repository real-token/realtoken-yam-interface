import { Web3Provider } from "@ethersproject/providers";
import { createStyles, Flex, Text } from "@mantine/core"
import { IconWallet } from "@tabler/icons"
import { useWeb3React } from "@web3-react/core";
import React from "react";
import { FC, useEffect, useState } from "react"
import { useTranslation } from "react-i18next";
import { Erc20, Erc20ABI } from "src/abis";
import { useWalletERC20Balance } from "src/hooks/useWalletERC20Balance"
import { getContract } from "src/utils";

const useStyles = createStyles((theme, _params, getRef) => ({
    container: {
      // subscribe to color scheme changes right in your styles
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[1],
      display: 'flex',
      width: '100%',
      gap: theme.radius.md,
      alignItems: 'center',
      borderRadius: theme.radius.md,
      padding: theme.radius.md
    },
    wallet: {
        display: "flex",
        justifyItems: "center",
        alignItems: "center",
        backgroundColor: theme.colors.brand[5],
        borderRadius: theme.radius.md,
        padding: 10,
    },
    balance: {
      flexGrow: 1
    },
    balanceContainer: {
      display: "flex",
      flexDirection: "column",
      rowGap: 0
    }
  }));

type WalletERC20BalanceProps = {
    balance: number|undefined
    symbol: string|undefined
}

export const WalletERC20Balance: FC<WalletERC20BalanceProps> = ({ balance, symbol }) => {

    const { classes } = useStyles();
    const { t } = useTranslation("components",{ keyPrefix: 'walletBalance' });

    return(
      <Flex direction={'column'} gap={'xs'} ml={8}>
          <Text>{t("title")}</Text>
          <div className={classes.container}>
              <div className={classes.wallet}><IconWallet color={"white"} size={24}/></div>
              <div className={classes.balanceContainer}>
                <Text fw={700} mr={5}>{`${symbol}`}</Text>
                <Text className={classes.balance}>{balance}</Text>
              </div>
          </div>
      </Flex>
    )
    
}