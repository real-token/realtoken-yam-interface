import { CSSObject, MantineTheme, Sx } from '@mantine/core';

type Styles = {
  caption: (theme: MantineTheme, params: { canSort: boolean }) => CSSObject;
  text: Sx;
};

export const styles: Styles = {
  caption: (theme, { canSort }) => ({
    cursor: canSort ? theme.cursorType : undefined,
  }),
  text: { textOverflow: 'ellipsis', overflow: 'hidden' },
};
