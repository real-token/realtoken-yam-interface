import { FC, forwardRef, useCallback } from 'react';

import {
  Group,
  Image,
  Select,
  SelectItem,
  SelectProps,
  Text,
} from '@mantine/core';
import { useWeb3React } from '@web3-react/core';

import { ALLOWED_CHAINS, CHAINS, ChainsID } from 'src/constants';
import { useActiveChain } from 'src/hooks';
import { FRC } from 'src/types';

type ChainSelectItemsProps = {
  label: string;
  logo: string;
};

console.log('env',process.env.NEXT_PUBLIC_ENV);

const data = ALLOWED_CHAINS
  .filter((chain) => (chain.toString() !== "5" && process.env.NEXT_PUBLIC_ENV === "production") || process.env.NEXT_PUBLIC_ENV !== "production")
  .map<SelectItem>((chain) => ( {
    value: chain.toString(),
    label: CHAINS[chain as ChainsID].chainName,
    logo: CHAINS[chain as ChainsID].logo,
  }));

const ChainSelectItems: FRC<ChainSelectItemsProps, HTMLDivElement> = forwardRef(
  ({ label, logo, ...props }, ref) => {
    return (
      <Group {...props} ref={ref} spacing={'xs'}>
        <Image src={logo} alt={label} width={18} height={18} fit={'contain'} />
        <Text>{label}</Text>
      </Group>
    );
  }
);
ChainSelectItems.displayName = 'ChainSelectItems';

const ChainSelectedIcon: FC = () => {
  const activeChain = useActiveChain();

  return (
    <Image
      src={activeChain?.logo}
      alt={activeChain?.chainName}
      width={18}
      height={18}
      fit={'contain'}
    />
  );
};

export const ChainSelect: FC<Partial<SelectProps>> = (props) => {
  const { chainId, connector } = useWeb3React();

  const switchChain = useCallback(
    async (chainValue: string) => {
      const desiredChainId = Number(chainValue);
      if (desiredChainId === chainId) return;

      await connector.activate(desiredChainId);
    },
    [chainId, connector]
  );

  return (
    <Select
      data={data}
      icon={<ChainSelectedIcon />}
      disabled={!chainId}
      value={chainId?.toString()}
      onChange={switchChain}
      itemComponent={ChainSelectItems}
      {...props}
    />
  );
};
