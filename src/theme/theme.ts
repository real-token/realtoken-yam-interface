import { ModalProps, createTheme } from '@mantine/core';

export const modalStyles: ModalProps['styles'] = {
  header: { justifyContent: 'center' },
  body: {
    padding: '1rem',
    width: "auto",
    maxWidth: "700px",
  },
  root: { zIndex: 99 },
  overlay: { zIndex: 99 },
  inner: { zIndex: 99 },
  content: {
    maxHeight: '95%',
  }
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
