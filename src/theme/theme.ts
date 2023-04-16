import { MantineTheme, MantineThemeOverride, ModalProps } from '@mantine/core';

export const modalStyles: ModalProps['styles'] = {
  header: { justifyContent: 'center' },
  modal: {
    // margin: '100px auto',
    width: 'auto',
    maxWidth: '700px',
  },
};

export const theme: MantineThemeOverride = {
  colors: {
    brand: [
      '#606e0c',
      '#F5BC51',
      '#F4B43E',
      '#F3AD2B',
      '#F2A91E',
      '#B7CC41',
      '#606e0c',
      '#333',
      '#606e0c',
      '#B7CC41',
    ],
  },
  primaryColor: 'brand',
  defaultGradient: { deg: 90, from: '#BBCB40', to: '#88992A' },
  defaultRadius: 'md',
  cursorType: 'pointer',
  components: {
    ActionIcon: { defaultProps: { variant: 'filled' } },
  },
  other: {
    border: (theme: MantineTheme) =>
      `thin solid ${
        theme.colorScheme === 'dark'
          ? theme.colors.dark[4]
          : theme.colors.gray[3]
      }`,
  },
};
