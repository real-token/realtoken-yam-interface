import { FC, ReactNode } from 'react';

import { AppShell } from '@mantine/core';

import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import { styles } from './Layout.styles';

type LayoutProps = { children: ReactNode };

export const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <AppShell header={<Header />} footer={<Footer />} styles={styles.appShell}>
      {children}
    </AppShell>
  );
};
