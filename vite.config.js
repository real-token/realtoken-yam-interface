import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { tanstackRouter } from '@tanstack/router-plugin/vite';
import { nodePolyfills } from 'vite-plugin-node-polyfills';
import fs from 'node:fs/promises';
import path from 'node:path';
import { resolveDevApiBearer } from './scripts/resolveDevApiBearer.mjs';
import { loadAuthEnv } from './scripts/loadAuthEnv.mjs';

const root = __dirname;
const nobleHashes = path.resolve(root, 'node_modules/@noble/hashes');
const walletConnectUtils = path.resolve(root, 'node_modules/@walletconnect/utils');
const viemMainnetOverride = path.resolve(root, './src/config/viemMainnet.ts');
const viemMainnetAliases = {
    'viem/chains/definitions/mainnet': viemMainnetOverride,
    'viem/chains/definitions/mainnet.js': viemMainnetOverride,
    'viem/_esm/chains/definitions/mainnet': viemMainnetOverride,
    'viem/_esm/chains/definitions/mainnet.js': viemMainnetOverride,
    'viem/_cjs/chains/definitions/mainnet': viemMainnetOverride,
    'viem/_cjs/chains/definitions/mainnet.js': viemMainnetOverride,
};

const MERKLE_RPC = 'https://eth.merkle.io';

/** Remplace eth.merkle.io (viem 2.29) pendant le pré-bundle et à l’exécution. */
function replaceViemMerkleRpc(ethRpcUrl) {
    return {
        name: 'replace-viem-merkle-rpc',
        enforce: 'pre',
        transform(code) {
            if (!code.includes(MERKLE_RPC)) return null;
            return {
                code: code.replaceAll(MERKLE_RPC, ethRpcUrl),
                map: null,
            };
        },
    };
}

/** Pendant optimizeDeps, esbuild fusionne viem avant les alias Vite : patch à la lecture du fichier. */
function merkleRpcEsbuildPlugin(ethRpcUrl) {
    return {
        name: 'replace-viem-merkle-rpc-esbuild',
        setup(build) {
            build.onLoad({ filter: /[/\\]definitions[/\\]mainnet\.js$/ }, async (args) => {
                const contents = await fs.readFile(args.path, 'utf8');
                if (!contents.includes(MERKLE_RPC)) return null;
                return {
                    contents: contents.replaceAll(MERKLE_RPC, ethRpcUrl),
                    loader: 'js',
                };
            });
        },
    };
}

// https://vitejs.dev/config/
export default defineConfig(async ({ command, mode }) => {
    const env = loadEnv(mode, root, '');
    const authEnv = loadAuthEnv(root, mode);
    const envForAuth = { ...env, ...authEnv };
    const ethRpcUrl =
        env.VITE_ETH_RPC_URL || 'https://ethereum-rpc.publicnode.com';

    let devApiBearer = '';
    if (command === 'serve') {
        devApiBearer = (await resolveDevApiBearer(envForAuth)) ?? '';
        if (devApiBearer) {
            console.log(
                '[dev-api-auth] Bearer JWT configuré pour les requêtes API'
            );
        }
    }

    return {
        define: {
            __DEV_API_BEARER__: JSON.stringify(devApiBearer),
            // Ne jamais exposer l’ancienne clé API dans le bundle (migrer vers AUTH_* côté Node)
            'import.meta.env.VITE_API_KEY': JSON.stringify(''),
        },
        plugins: [
            replaceViemMerkleRpc(ethRpcUrl),
            tanstackRouter(),
            react(),
            nodePolyfills({
                globals: {
                    Buffer: true,
                    global: true,
                    process: false, // On gère process dans index.html
                },
                include: ['buffer', 'stream', 'util', 'events'],
                protocolImports: true,
            }),
        ],
        resolve: {
            alias: {
                src: path.resolve(root, './src'),
                ...viemMainnetAliases,
                '@noble/hashes': nobleHashes,
                '@walletconnect/utils': walletConnectUtils,
            },
            dedupe: [
                '@noble/hashes',
                '@noble/curves',
                '@walletconnect/utils',
                '@walletconnect/core',
                '@walletconnect/sign-client',
                '@walletconnect/types',
            ],
        },
        optimizeDeps: {
            esbuildOptions: {
                alias: viemMainnetAliases,
                plugins: [merkleRpcEsbuildPlugin(ethRpcUrl)],
            },
        },
        server: {
            port: 3000,
            allowedHosts: true,
        },
        build: {
            outDir: 'dist',
        },
    };
});
