import { useWeb3React } from "@web3-react/core"
import { BytesLike } from "ethers"
import { useEffect, useState } from "react"
import { useQuery } from "react-query"
import { ContractsID } from "src/constants"
import { getContract } from "src/utils"
import { useContract } from "./useContract"

type UseAdmin = () => {
    isAdmin: boolean
}

export const useAdmin: UseAdmin = () => {

    const { account } = useWeb3React();
    const [isAdmin,setIsAdmin] = useState<boolean>(true);

    const realTokenYamUpgradeable = useContract(ContractsID.realTokenYamUpgradeable);

    const getAddressIsAdmin = (): Promise<boolean> => {
        return new Promise<boolean>(async (resolve,reject) => {
            try{

                if(!realTokenYamUpgradeable || !account) return;

                const isAdmin = await realTokenYamUpgradeable.hasRole("0x71f3d55856e4058ed06ee057d79ada615f65cdf5f9ee88181b914225088f834f",account);
                console.log(isAdmin)

                resolve(isAdmin);

            }catch(err){
                console.log("Fail to get address role: ", err);
                reject();
            }
        });
    }

    const { data, refetch, isLoading } = useQuery(["isAdmin"],getAddressIsAdmin, { enabled: !!realTokenYamUpgradeable });

    useEffect(() => {
        if(account && !isLoading) refetch();
    },[account,isLoading])

    // useEffect(() => {
    //     if(data !== undefined) setIsAdmin(data);
    // },[data])

    return{
        isAdmin
    }
}