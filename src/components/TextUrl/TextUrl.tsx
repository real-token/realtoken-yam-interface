import { Flex, Text, createStyles } from '@mantine/core';
import { IconExternalLink } from '@tabler/icons';

import { openInNewTab } from 'src/utils/window';

const useStyle = createStyles((theme) => ({
  container: {
    display: 'flex',
    gap: theme.spacing.sm,
    borderBottomStyle: 'solid',
    borderBottomWidth: '2px',
    borderBottomColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'start',
    '&:hover': {
      borderBottomColor: theme.colors.brand,
      cursor: 'pointer',
    },
  },
}));

interface TextUrlProps {
  url: string;
  children: React.ReactNode;
}
export const TextUrl = ({ url, children }: TextUrlProps) => {
  const { classes } = useStyle();

  return (
    <Flex className={classes.container} onClick={() => openInNewTab(url)}>
      <Text>{children}</Text>
      <IconExternalLink size={16} />
    </Flex>
  );
};
