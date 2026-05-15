import { useMemo } from 'react';

import { ContextModalProps } from '@mantine/modals';
import { useRealTokenUIConfig } from '@real-token/core';
import { AaModal } from '@real-token/aa-modal';
import { merge } from 'lodash-es';

import type { YamAaModalConfig } from 'src/types/aaModalConfig';

/**
 * Fusionne toujours la config YAM (allowedWalletIds, etc.) avec innerProps
 * pour que les ouvertures `wallet` avec innerProps: {} gardent le filtre.
 */
export function YamAaModal(
  props: ContextModalProps<Partial<YamAaModalConfig>>
) {
  const { aaModalConfig } = useRealTokenUIConfig();
  const innerProps = useMemo(
    () => merge({}, aaModalConfig, props.innerProps ?? {}),
    [aaModalConfig, props.innerProps]
  );

  return <AaModal {...props} innerProps={innerProps} />;
}
