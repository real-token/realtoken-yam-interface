import type { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { Button, Skeleton, Tooltip } from '@mantine/core';
import { IconWallet } from '@tabler/icons-react';

import { useYamNativeBalance } from 'src/hooks/useYamNativeBalance';

function formatDisplayBalance(
  balance: bigint,
  decimals: number,
  symbol: string
): string {
  const num = Number(balance) / 10 ** decimals;

  if (num >= 1000) {
    return `${(num / 1000).toFixed(1)}K ${symbol}`;
  }
  if (num >= 1) {
    return `${num.toFixed(2)} ${symbol}`;
  }
  if (num >= 0.0001) {
    return `${num.toFixed(4)} ${symbol}`;
  }
  if (num > 0) {
    return `< 0.0001 ${symbol}`;
  }
  return `0 ${symbol}`;
}

export const YamNativeBalanceButton: FC = () => {
  const { t } = useTranslation('common', { keyPrefix: 'wallet' });
  const { balance, formatted, symbol, decimals, isLoading } = useYamNativeBalance();

  if (isLoading) {
    return <Skeleton width={100} height={36} radius="sm" />;
  }

  const displayBalance = formatDisplayBalance(balance, decimals, symbol);
  const fullBalance = `${formatted} ${symbol}`;

  return (
    <Tooltip label={fullBalance}>
      <Button
        size="sm"
        variant="subtle"
        color="brand"
        leftSection={<IconWallet size={16} />}
        aria-label={t('balance')}
        style={{ cursor: 'default' }}
      >
        {displayBalance}
      </Button>
    </Tooltip>
  );
};
