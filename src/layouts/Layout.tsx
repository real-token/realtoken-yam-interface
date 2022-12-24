import { createStyles } from '@mantine/core';
import { FC, ReactNode } from 'react';
import { Footer } from '../components/Footer';
import { Header } from '../components/Header';

type LayoutProps = { children: ReactNode };

const useStyles = createStyles((theme, _params, getRef) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    height: '100vh'
  },
  main: {
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
    overflowY: "auto"
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
