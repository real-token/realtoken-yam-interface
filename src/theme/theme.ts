import { ModalProps, createTheme } from '@mantine/core';

export const modalStyles: ModalProps['styles'] = {
  header: { justifyContent: 'center' },
  body: {
    padding: '1rem',
    width: 'auto',
    maxWidth: 'min(96vw, 36rem)',
    maxHeight: 'min(95vh, 860px)',
    overflowY: 'auto',
  },
  root: { zIndex: 10 },
  overlay: { zIndex: 10 },
  inner: {
    zIndex: 10,
    paddingTop: '1rem',
    paddingBottom:
      'max(1.25rem, calc(1rem + env(safe-area-inset-bottom, 0px)))',
    alignItems: 'center',
  },
  content: {
    width: 'auto',
    maxWidth: 'min(96vw, 36rem)',
    maxHeight: 'min(95vh, 900px)',
    overflow: 'visible',
  },
};

export const theme = createTheme({
  colors: {
    brand: [
      '#F6CA79',
      '#F5BC51',
      '#F4B43E',
      '#F3AD2B',
      '#F2A91E',
      '#E79B0D',
      '#D48E0C',
      '#C1810B',
      '#AE740A',
      '#9A6709',
    ],
  },
  primaryColor: 'brand',
  defaultGradient: { deg: 90, from: '#F6CA79', to: '#E79B0D' },
  defaultRadius: 'md',
  cursorType: 'pointer',
  components: {
    ActionIcon: { defaultProps: { variant: 'filled' } },
  },
  other: {
    border: () => 'thin solid var(--mantine-color-dark-4)'
  },
})
