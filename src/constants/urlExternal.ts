export type UrlExternal = {
  url: string | ((id: string) => string);
  name: string;
  keyword: string;
};

export type UrlExternalParam = {
  url: (id: string) => string;
  name: string;
  keyword: string;
};

export const UrlMtPelerin: UrlExternal = {
  name: 'Mont Pelerin',
  url: 'https://www.mtpelerin.com/join?rfr=cleansatmining',
  keyword: 'Mt Pelerin',
};

export const UrlContactUs: UrlExternal = {
  name: 'CleanSat Mining, contact us',
  url: 'contact@cleansatmining.com',
  keyword: 'contact',
};

export const UrlForms: UrlExternal = {
  name: 'Google forms',
  url: 'https://forms.gle/QvfMfRELQDss6NAZ8',
  keyword: 'form',
};

export const UrlDashboard: UrlExternal = {
  name: 'Dashboard',
  url: 'https://dashboard.cleansatmining.net',
  keyword: 'dashboard',
};

export const UrlGnosisscanTransaction: UrlExternalParam = {
  name: 'Gnosisscan Transaction',
  url: (hash: string) => `https://gnosisscan.io/tx/${hash}`,
  keyword: 'transaction',
};

export const UrlGnosisscanBlock: UrlExternalParam = {
  name: 'Gnosisscan Block',
  url: (block: string) => `https://gnosisscan.io/block/${block}`,
  keyword: 'block',
};

export const UrlGnosisscanAddress: UrlExternalParam = {
  name: 'Gnosisscan Address',
  url: (address: string) => `https://gnosisscan.io/address/${address}`,
  keyword: 'address',
};
