export type UrlTheGraph = {
  Eth: string;
  Gnosis: string;
  Goerli: string;
};

export const UrlTheGraphToken: UrlTheGraph = {
  Eth: 'https://api.thegraph.com/subgraphs/name/realtoken-thegraph/realtoken-eth',
  Gnosis:
    'https://api.thegraph.com/subgraphs/name/realtoken-thegraph/realtoken-xdai',
  Goerli:
    'https://api.thegraph.com/subgraphs/name/realtoken-thegraph/realtoken-goerli',
};

export const UrlTheGraphYam: UrlTheGraph = {
  Eth: 'https://api.thegraph.com/subgraphs/name/realtoken-thegraph/yam-realt-subgraph',
  Gnosis:
    'https://api.thegraph.com/subgraphs/name/realtoken-thegraph/yam-realt-subgraph-gnosis',
  Goerli:
    'https://api.thegraph.com/subgraphs/name/realtoken-thegraph/yam-realt-subgraph-goerli',
};
