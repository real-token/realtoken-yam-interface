import React from 'react';

import {
  ActionIcon,
  CopyButton,
  Group,
  Paper,
  Text,
  Tooltip,
} from '@mantine/core';
import { IconCheck, IconCopy } from '@tabler/icons-react';

import { truncateAddress } from 'src/utils/string';

interface FieldPaperProps {
  name: string;
  value: string;
  copyButton?: boolean;
  truncate?: boolean;
  link?: string;
  shadow?: boolean;
}

export const FieldPaper: React.FC<FieldPaperProps> = ({
  name,
  value,
  copyButton = false,
  truncate = true,
  link,
  shadow = true,
}) => {
  const truncatedField = truncate ? truncateAddress(value) : value;
  const isTruncated = truncatedField.length !== value.length;

  return (
    <Paper
      shadow={shadow ? 'xs' : undefined}
      sx={{ padding: '0 10px 0 10px' }}
      miw={200}
      w={'100%'}
    >
      <Group spacing={5} position={'apart'} w={'100%'}>
        <Text fw={600} fz={'sm'}>
          {name}
        </Text>
        <Group spacing={5} position={'left'}>
          <Tooltip
            label={value}
            withArrow={true}
            position={'right'}
            disabled={!isTruncated}
          >
            {link ? (
              <a
                href={link}
                target={'_blank'}
                rel={'noopener noreferrer'}
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                <Text
                  fw={500}
                  fz={'sm'}
                  style={{ color: 'inherit', textDecoration: 'none' }}
                >
                  {truncatedField}
                </Text>
              </a>
            ) : (
              <Text fw={500} fz={'sm'}>
                {truncatedField}
              </Text>
            )}
          </Tooltip>
          {copyButton && (
            <CopyButton value={value} timeout={2000}>
              {({ copied, copy }) => (
                <Tooltip
                  label={copied ? 'Copied' : 'Copy'}
                  withArrow={true}
                  position={'right'}
                >
                  <ActionIcon
                    size={'1.3rem'}
                    color={copied ? 'teal' : undefined}
                    onClick={copy}
                    variant={'transparent'}
                  >
                    {copied ? (
                      <IconCheck size={'1.3rem'} />
                    ) : (
                      <IconCopy size={'1.3rem'} />
                    )}
                  </ActionIcon>
                </Tooltip>
              )}
            </CopyButton>
          )}
        </Group>
      </Group>
    </Paper>
  );
};
