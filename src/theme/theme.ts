import { MantineTheme, MantineThemeOverride, ModalProps } from '@mantine/core';

export const modalStyles: ModalProps['styles'] = {
  header: { justifyContent: 'center', borderRadius: '25px' },
  body: {
    padding: '1rem',
    width: 'auto',
    maxWidth: '800px',
    //minWidth: '700px',
    //maxHeight: 'calc(100vh - (3vh * 2))',
    //overflow: 'auto',
    borderRadius: '25px',
  },
  root: {
    //zIndex: 10,
    borderRadius: '25px',
  },
  overlay: {
    //zIndex: 10,
  },
  inner: {
    //zIndex: 10,
    borderRadius: '25px',
  },
  content: {
    minWidth: '650px',
    //overflowY: 'unset !important' as 'unset',
    //maxHeight: 'calc(100vh - (3vh * 2)) !important',
    borderRadius: '25px',
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
