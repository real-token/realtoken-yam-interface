import { Box, CSSObject, DefaultProps, Selectors } from '@mantine/core';

import { DividerStylesParams, useStyles } from './Divider.styles';

type DividerStylesNames = Selectors<typeof useStyles>;

type DividerProps = DefaultProps<DividerStylesNames, DividerStylesParams> &
  DividerStylesParams;

export const Divider = ({
  classNames,
  styles,
  unstyled,
  height = 4,
  width = '100%',
  vertical = false,
  gradient,
  inverted = false,
  className,
  ...others
}: DividerProps) => {
  const { classes, cx } = useStyles(
    { height, width, vertical, gradient, inverted },
    {
      name: 'NewDivider',
      classNames: classNames,
      styles: styles as Record<string, CSSObject>,
      unstyled: unstyled,
    }
  );

  return <Box className={cx(classes.divider, className)} {...others} />;
};
