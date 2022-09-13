import 'react-i18next';

import { DEFAULT_NS, resources } from 'src/i18next';

declare module 'react-i18next' {
  interface CustomTypeOptions {
    defaultNS: typeof DEFAULT_NS;
    resources: typeof resources.fr;
  }
}
