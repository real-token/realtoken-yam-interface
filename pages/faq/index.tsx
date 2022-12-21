import { Accordion, Flex, Text } from "@mantine/core";
import { useTranslation } from "react-i18next";

const FAQ = () => {

    const { t } = useTranslation('faq');

    return(
        <Flex direction={"column"} p={"xl"} gap={"md"}>
            <Text size={"xl"}>{t("title")}</Text>

            <Accordion defaultValue={"how-to-use"} variant={"separated"} chevronPosition={"left"}>
                <Accordion.Item value={"how-to-use"}>
                    <Accordion.Control>{t("createOffer.title")}</Accordion.Control>
                    <Accordion.Panel>
                        <Flex gap={4} mb={12}>
                            {t("createOffer.answer")}
                            <a href={t("createOffer.link")}>{t("createOffer.here")}</a>
                        </Flex>
                        <Text>{t("createOffer.thanks")}</Text>
                    </Accordion.Panel>
                </Accordion.Item>
            </Accordion>
        </Flex>
    )
}

export default FAQ;