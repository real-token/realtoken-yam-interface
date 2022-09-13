import { FC, ReactNode } from 'react';

import { Footer } from '../components/Footer';
import { Header } from '../components/Header';

const Layout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div>
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
