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


  return (
    <div className={classes.container}>
      <Header />
      <div className={classes.main}>
        {children}
      </div>
      <Footer />
    </div>
  );
};
