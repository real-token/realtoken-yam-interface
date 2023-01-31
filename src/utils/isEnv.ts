export enum ENV{
    PROD = "production",
    STAGING = "staging",
    DEV = "dev"
}

export const isEnvs = (envs: ENV[]) => {
    return envs.includes(process.env.NEXT_PUBLIC_ENV as ENV);
}