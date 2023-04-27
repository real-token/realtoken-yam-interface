import { Sx } from '@mantine/core';
import { hexToRgb } from "src/utils/color"

type Styles = {
  container: Sx;
  message: Sx;
};

export const styles: Styles = {
  container: (theme) => ({
    [theme.fn.smallerThan('xs')]: {
      padding: theme.spacing.xs,
    },

    [theme.fn.largerThan('xs')]: {
      padding: theme.spacing.md,
    },
  }),
  message: (theme) => ({
    width: '100%',
    padding: '5px',
    margin: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: `1px solid ${theme.colors.gray[2]}`,
    backgroundColor: theme.colors.yellow[0],//'#fffaf2',
    color: theme.colors.brand[4],
    fontWeight: 500,
  }),
};
