export enum ENV{
    PROD = "production",
    STAGING = "staging",
    DEV = "dev"
}

export const isEnvs = (envs: ENV[]) => {
    return envs.includes(import.meta.env.VITE_ENV as ENV);
}