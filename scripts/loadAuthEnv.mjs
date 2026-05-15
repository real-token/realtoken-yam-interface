import fs from 'node:fs';
import path from 'node:path';
import dotenv from 'dotenv';

const AUTH_KEYS = ['AUTH_USER', 'AUTH_PASSWORD', 'AUTH_TOKEN'];

/**
 * Charge AUTH_* depuis .env sans expansion $ (contrairement à vite loadEnv).
 * @param {string} root
 * @param {string} mode
 */
export function loadAuthEnv(root, mode = 'development') {
  const files = ['.env', '.env.local', `.env.${mode}`, `.env.${mode}.local`];
  const authEnv = {};

  for (const file of files) {
    const filePath = path.resolve(root, file);
    if (!fs.existsSync(filePath)) continue;
    const parsed = dotenv.parse(fs.readFileSync(filePath, 'utf8'));
    for (const key of AUTH_KEYS) {
      if (parsed[key] != null && parsed[key] !== '') {
        authEnv[key] = parsed[key];
      }
    }
  }

  return authEnv;
}
