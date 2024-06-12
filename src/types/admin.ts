export enum USER_ROLE{
    ADMIN = "ADMIN",
    MODERATOR = "MODERATOR",
    NO_ROLE = "NO_ROLE"
}

export type AddressRegistry = {
    address: string,
    whitelisted: boolean
}

export const ROLE: Map<USER_ROLE,string> = new Map<USER_ROLE,string>([
    [USER_ROLE.MODERATOR,"0x71f3d55856e4058ed06ee057d79ada615f65cdf5f9ee88181b914225088f834f"],
    [USER_ROLE.ADMIN,"0x0000000000000000000000000000000000000000000000000000000000000000"]
])

export const isRole = (role: USER_ROLE, roles: USER_ROLE[]): boolean => {
    return roles.includes(role)
}