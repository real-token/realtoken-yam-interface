import { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema:
    process.env.NEXT_PUBLIC_API_URL || 'https://api.realtoken.network/graphql',
  documents: ['src/**/*.tsx'],
  generates: {
    './gql/': {
      preset: 'client',
      plugins: [],
      presetConfig: {
        gqlTagName: 'gql',
      },
    },
  },
  ignoreNoDocuments: true,
};

export default config;
