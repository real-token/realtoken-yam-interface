import { ModalProps } from '@mantine/core';

export const modalStyles: ModalProps['styles'] = {
  header: { justifyContent: 'center' },
  body: {
    padding: '1rem',
    width: "auto",
    maxWidth: "700px",
    maxHeight: 'calc(100vh - (3vh * 2))',
    overflowY: "scroll"
  },
  root: { zIndex: 10 },
  overlay: { zIndex: 10 },
  inner: { zIndex: 10 },
  content: {
    overflowY: "unset !important" as "unset",
    maxHeight: 'calc(100vh - (3vh * 2)) !important',
  }
};