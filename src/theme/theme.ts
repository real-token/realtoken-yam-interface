import { MantineTheme, MantineThemeOverride, ModalProps } from '@mantine/core';

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
  white: '#FAFAFA',
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
export const modalStyles: ModalProps['styles'] = {
  header: {
    justifyContent: 'center',
    overflow: 'hidden',
    padding: 0,
    borderTopLeftRadius: '25px',
    borderTopRightRadius: '25px',
  },
  body: {
    marginTop: '1rem',
    padding: '1rem',
    width: 'auto',
    maxWidth: '700px',
    maxHeight: 'calc(100vh - (3vh * 2))',
    overflowY: 'auto',
    borderRadius: '25px',
  },
  root: { zIndex: 10, borderRadius: '25px' },
  overlay: { zIndex: 10, borderRadius: '25px' },
  inner: { zIndex: 10, borderRadius: '25px' },
  content: {
    borderRadius: '25px',
    overflowY: 'unset !important' as 'unset',
    maxHeight: 'calc(100vh - (3vh * 2)) !important',
  },
};
