import { Flex, Text } from "@mantine/core"
import { FC } from "react"
import { useTranslation } from "react-i18next";
import { useAdmin } from "src/hooks/useAdmin";

interface ActionProps{
    title: string;
    children: React.ReactNode;
}

export const Action: FC<ActionProps> = ({ title, children }) => {

    const { isAdmin } = useAdmin();
    const { t } = useTranslation("common", { keyPrefix: "general" })

    return(
        <Flex direction={"column"} gap={"md"}>
            <Text color={"brand"} fw={700} fz={"xl"}>{title}</Text>
            {
                isAdmin ? (
                    <>
                    
                    {children}
                    </>
                )
                : <Text>{t("noAdminError")}</Text>
            }
        </Flex>
    )
}