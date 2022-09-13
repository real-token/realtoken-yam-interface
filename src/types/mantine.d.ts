import { Tuple, DefaultMantineColor, MantineTheme } from '@mantine/core';

type ExtendedCustomColors = 'brand' | DefaultMantineColor;

declare module '@mantine/core' {
  export interface MantineThemeColorsOverride {
    colors: Record<ExtendedCustomColors, Tuple<string, 10>>;
  }
  export interface MantineThemeOther {
    border: (theme: MantineTheme) => string;
  }
}