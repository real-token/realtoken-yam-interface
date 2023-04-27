import { Flex, Text } from "@mantine/core";
import { IconWalletOff, IconNetworkOff } from "@tabler/icons";
import { useWeb3React } from "@web3-react/core";
import { useTranslation } from "react-i18next";
import { ALLOWED_CHAINS } from 'src/constants';

interface ConnectedProviderProps {
    children: React.ReactNode
}
export const ConnectedProvider = ({ children }: ConnectedProviderProps) => {

    const { chainId, account } = useWeb3React();
    const { t } = useTranslation("common", { keyPrefix: "general" });
    const chainAllowed = ALLOWED_CHAINS.find((chain) => (chain === chainId));
    const message = !account ? t("noConnectedWallet") : t("notAllowedNetwork");

    return (
        <>
            {(account && chainAllowed) ?
                children
                :
                <Flex style={{ width: "100%", height: "100%" }} justify={"center"} align={"center"} gap={"sm"}>
                    {!account ? <IconWalletOff size={36} /> : <IconNetworkOff size={36} />}
                    <Text fw={700} fz={"xl"}>{message}</Text>
                </Flex>
            }
        </>
    )
}