import { AppShellProps } from '@mantine/core';

const HEADER_HEIGHT = 73;
const HEADER_HEIGHT_XS = 61;

const FOOTER_HEIGHT = 68;
const FOOTER_HEIGHT_XS = 82;

type Styles = {
  appShell: AppShellProps['styles'];
};

export const styles: Styles = {
  appShell: (theme) => ({
    main: {
      [theme.fn.smallerThan('xs')]: {
        padding: theme.spacing.xs,
        paddingTop: theme.spacing.xs + HEADER_HEIGHT_XS,
        paddingBottom: theme.spacing.xs + FOOTER_HEIGHT_XS,
      },
      [theme.fn.largerThan('xs')]: {
        padding: theme.spacing.xl,
        paddingTop: theme.spacing.xl + HEADER_HEIGHT,
        paddingBottom: theme.spacing.xl + FOOTER_HEIGHT,
      },
    },
  }),
};
