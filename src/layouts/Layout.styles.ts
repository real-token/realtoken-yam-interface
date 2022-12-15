import { AppShellProps } from '@mantine/core';

type Styles = {
  appShell: AppShellProps['styles'];
};

export const styles: Styles = {
  appShell: (theme) => ({
    main: {
      [theme.fn.smallerThan('xs')]: {
        padding: theme.spacing.xs,
      },
      [theme.fn.largerThan('xs')]: {
        padding: theme.spacing.xl,
      },
    },
  }),
};
