import { useWeb3React } from "@web3-react/core"
import { useEffect, useState } from "react"
import { useQuery } from "react-query"
import { ContractsID } from "src/constants"
import { ROLE, USER_ROLE } from "src/types/admin"
import { useContract } from "./useContract"

type UseRole = () => {
    role: USER_ROLE
}

export const useRole: UseRole = () => {

    const { account } = useWeb3React();
    const [role,setRole] = useState<USER_ROLE>(USER_ROLE.NO_ROLE);

    const realTokenYamUpgradeable = useContract(ContractsID.realTokenYamUpgradeable);
    
    const getAddressIsAdmin = (): Promise<USER_ROLE> => {
        return new Promise<USER_ROLE>(async (resolve,reject) => {
            try{
                if(!realTokenYamUpgradeable || !account) return;

                const [isAdmin,isModerator] = await Promise.all([
                    realTokenYamUpgradeable.hasRole(ROLE.get(USER_ROLE.ADMIN) ?? "",account),
                    realTokenYamUpgradeable.hasRole(ROLE.get(USER_ROLE.MODERATOR) ?? "",account)
                ]);

                if(isAdmin){
                    resolve(USER_ROLE.ADMIN);
                    return;
                }
                if(isModerator){
                    resolve(USER_ROLE.MODERATOR);
                    return;
                }

                resolve(USER_ROLE.NO_ROLE)

            }catch(err){
                console.log("Fail to get address role: ", err);
                reject();
            }
        });
    }

    const { data, refetch } = useQuery(["isAdmin"],getAddressIsAdmin,{ enabled: (realTokenYamUpgradeable !== undefined && account !== undefined) });

    useEffect(() => {
        if(account) refetch();
    },[account])

    useEffect(() => {
        if(data !== undefined) setRole(data);
    },[data])

    return{
        role
    }
}