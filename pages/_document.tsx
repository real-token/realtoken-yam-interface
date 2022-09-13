import { default as NextDocument } from 'next/document';

import { createGetInitialProps } from '@mantine/next';

const getInitialProps = createGetInitialProps();

export default class _Document extends NextDocument {
  static getInitialProps = getInitialProps;
}
