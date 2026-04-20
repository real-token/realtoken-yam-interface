import { Flex, Text } from "@mantine/core";
import { useNavigate } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import classes from "./FooterLinks.module.css";

export const FooterLinks = () => {

    const { t } = useTranslation("links");
    const navigate = useNavigate();

    return(
        <Flex>
            <Text
                size={'sm'}
                fw={700}
                onClick={() => navigate({ to: "/faq" })}
                className={classes.link}
            >
                {t("footer.faq")}
            </Text>
        </Flex>
    )

}