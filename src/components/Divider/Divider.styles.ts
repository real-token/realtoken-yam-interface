import { MantineGradient, createStyles } from '@mantine/core';

export type DividerStylesParams = {
  height?: number | string;
  width?: number | string;
  gradient?: MantineGradient;
  vertical?: boolean;
  inverted?: boolean;
};

export const useStyles = createStyles(
  (
    theme,
    { vertical, height, width, inverted, gradient }: DividerStylesParams
  ) => ({
    divider: {
      height: vertical ? width : height,
      width: vertical ? height : width,
      background: theme.fn.gradient({
        ...(gradient ?? theme.defaultGradient),
        deg: vertical ? (inverted ? 180 : 360) : inverted ? 270 : 90,
      }),
    },
  })
);
