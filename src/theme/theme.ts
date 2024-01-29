import { ModalProps } from '@mantine/core';

export const modalStyles: ModalProps['styles'] = {
  header: { justifyContent: 'center' },
  body: {
    padding: '1rem',
  },
  root: { zIndex: 10 },
  overlay: { zIndex: 10 },
  inner: { zIndex: 10 },
  content: {}
};