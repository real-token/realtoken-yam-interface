import { createStyles, Flex, Skeleton, Text } from "@mantine/core"
import { IconWallet } from "@tabler/icons"
import React from "react";
import { FC } from "react"
import { useTranslation } from "react-i18next";

interface Param{
  isLoading: boolean;
}

const useStyles = createStyles((theme, { isLoading } : Param, getRef) => ({
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
      rowGap: isLoading ? 5 : 0,
      width: "100%"
    }
  }));

type WalletERC20BalanceProps = {
    balance: string|undefined
    symbol: string|undefined
}

export const WalletERC20Balance: FC<WalletERC20BalanceProps> = ({ balance, symbol }) => {

    const { classes } = useStyles({
      isLoading: !balance && !symbol
    });
    const { t } = useTranslation("components",{ keyPrefix: 'walletBalance' });

    return(
      <Flex direction={'column'} gap={'xs'}>
          <Text>{t("title")}</Text>
          <div className={classes.container}>
              <div className={classes.wallet}><IconWallet color={"white"} size={24}/></div>
              <div className={classes.balanceContainer}>
                <Text fw={700}>{ symbol ? `${symbol}` : <Skeleton width={"100%"} height={20} color={"brand"}/>}</Text>
                <Text className={classes.balance}>{balance ? balance : <Skeleton width={"100%"} height={15} color={"brand"}/>}</Text>
              </div>
          </div>
      </Flex>
    )
    
}