import { Flex, Text } from "@mantine/core";
import { IconWalletOff } from "@tabler/icons";
import { useWeb3React } from "@web3-react/core";
import { useTranslation } from "react-i18next";

interface ConnectedProviderProps{
    children: React.ReactNode
}
export const ConnectedProvider = ({ children }: ConnectedProviderProps) => {

    const { account } = useWeb3React();
    const { t } = useTranslation("common", { keyPrefix: "general" });

    return(
        <>
        { account ? 
            children 
          : 
            <Flex style={{ width: "100%", height: "100%" }} justify={"center"} align={"center"} gap={"sm"}>
                <IconWalletOff size={36}/>
                <Text fw={700} fz={"xl"}>{t("noConnectedWallet")}</Text>
            </Flex>
        }
        </>
    )
}