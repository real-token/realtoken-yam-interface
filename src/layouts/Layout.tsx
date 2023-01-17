import { createStyles, Flex, Text } from '@mantine/core';
import { IconWalletOff } from '@tabler/icons';
import { useWeb3React } from '@web3-react/core';
import { FC, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { Footer } from '../components/Footer';
import { Header } from '../components/Header';

type LayoutProps = { children: ReactNode };

const useStyles = createStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    height: '100vh'
  },
  main: {
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
    overflowY: "auto",
    padding: `0 ${theme.spacing.xl}px`
  }
}));

export const Layout: FC<LayoutProps> = ({ children }) => {

  const { classes } = useStyles();
  const { account } = useWeb3React();

  const { t } = useTranslation("common", { keyPrefix: "general" });

  return (
    <div className={classes.container}>
      <Header />
      <div className={classes.main}>
        {/* {children} */}
        { account ? 
            children 
          : 
            <Flex style={{ width: "100%", height: "100%" }} justify={"center"} align={"center"} gap={"sm"}>
                <IconWalletOff size={36}/>
                <Text fw={700} fz={"xl"}>{t("noConnectedWallet")}</Text>
            </Flex>
        }
      </div>
      <Footer />
    </div>
  );
};
