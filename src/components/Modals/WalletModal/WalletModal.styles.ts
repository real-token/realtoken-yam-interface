import { ButtonProps } from '@mantine/core';

type Styles = {
  button: ButtonProps['styles'];
};

export const styles: Styles = {
  button: {
    inner: { justifyContent: 'space-between' },
  },
};
