import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { tanstackRouter } from '@tanstack/router-plugin/vite';
import { nodePolyfills } from 'vite-plugin-node-polyfills';
import path from 'path';
// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        tanstackRouter(),
        react(),
        nodePolyfills({
            include: ["process", "buffer"],
        }),
    ],
    resolve: {
        alias: {
            src: path.resolve(__dirname, './src'),
        },
    },
    define: {
        'process.env': process.env,
    },
    server: {
        port: 3000,
        allowedHosts: true,
    },
    build: {
        outDir: 'dist',
    },
});
