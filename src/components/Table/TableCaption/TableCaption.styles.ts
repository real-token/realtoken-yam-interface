import { Sx } from '@mantine/core';

type Styles = {
  caption: Sx;
};

export const styles: Styles = {
  caption: (theme) => ({
    borderTop: theme.other.border(theme),
  }),
};
