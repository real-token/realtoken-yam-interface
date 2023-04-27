import { FC, useCallback, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Image,
  SelectItem,
  Menu,
  Box,
  Sx
} from '@mantine/core';
import { useWeb3React } from '@web3-react/core';
import { IconAlertTriangle } from '@tabler/icons';
import { ALLOWED_CHAINS, CHAINS, ChainsID } from 'src/constants';
import { useActiveChain } from 'src/hooks';
import { t } from 'i18next';


type SelectNetworkItem = SelectItem & {
  logo: string;
};

console.log('env', process.env.NEXT_PUBLIC_ENV);

const data = ALLOWED_CHAINS
  .filter((chain) => (chain.toString() !== "5" && process.env.NEXT_PUBLIC_ENV === "production") || process.env.NEXT_PUBLIC_ENV !== "production")
  .map<SelectNetworkItem>((chain) => ({
    value: chain.toString(),
    label: CHAINS[chain as ChainsID].chainName,
    logo: CHAINS[chain as ChainsID].logo,
  }));



export const ChainList: FC = () => {

  return (
    <>{
      data.map(({ logo, label, value }) => (
        <ChainMenuItem chainValue={value} label={label ? label : ""} logo={logo}></ChainMenuItem>
      ))
    }
    </>
  );
};

const ChainMenuItem: FC<{ logo: string; label: string; chainValue: string }> = ({ logo, label, chainValue }) => {
  const { chainId, connector } = useWeb3React();

  const switchChain = useCallback(
    async () => {
      const desiredChainId = Number(chainValue);
      if (desiredChainId === chainId) return;

      await connector.activate(desiredChainId);
    },
    [chainId, connector]
  );

  return (
    <Menu.Item
      onClick={switchChain}
      icon={<Image src={logo} alt={label} width={18} height={18} fit={'contain'} />}
      color={chainId === Number(chainValue) ? 'brand' : ''}>
      {label}
    </Menu.Item>
  );
};









export const MessageNetwork: FC<{ classeName: Sx }> = ({ classeName }) => {
  const { t } = useTranslation('menu', { keyPrefix: 'messages' });
  const { connector } = useWeb3React();
  const activeChain = useActiveChain();
  const [chain, setChain] = useState(activeChain);

  useEffect(() => {
    setChain(activeChain)
  }, [activeChain]);

  const switchChain = useCallback(
    async () => {
      const desiredChainId = Number(1);
      await connector.activate(desiredChainId);
    },
    [connector]
  );

  return (
    <>{
      !chain &&
      <Box sx={classeName}>
        <IconAlertTriangle size={20} aria-label={'Network'} style={{ marginRight: '8px' }} />
        <div>{t('notAllowedNetwork')}<span onClick={switchChain} style={{ cursor: 'pointer', textDecoration: 'underline'}}>{t('switchNetwork')}</span></div>
      </Box>}
    </>
  );
};