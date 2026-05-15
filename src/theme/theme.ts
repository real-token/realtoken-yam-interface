import { ModalProps, createTheme } from '@mantine/core';

export const modalStyles: ModalProps['styles'] = {
  header: { justifyContent: 'center' },
  body: {
    padding: '1rem',
    width: 'auto',
    /* La largeur suit `size` (openContextModal) ; éviter maxWidth fixe trop étroit. */
    maxHeight:
      'min(calc(100dvh - 5.5rem), calc(100vh - 5.5rem))',
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
    maxHeight:
      'min(calc(100dvh - 4.5rem), calc(100vh - 4.5rem))',
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
