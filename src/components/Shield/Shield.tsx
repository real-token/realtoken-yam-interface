import { Checkbox, createStyles, Flex, Menu, NumberInput, Text, Tooltip } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks";
import { IconPercentage, IconShieldCheck, IconShieldX } from "@tabler/icons";
import { useAtom } from "jotai";
import { useTranslation } from "react-i18next";
import { shieldDisabledAtom, shieldValueAtom } from "src/states";

const useStyles = createStyles((theme) => ({
    container: {
        display: "flex",
        flexDirection: "row",
        height: "35px",
        gap: theme.spacing.xs,
        alignItems: "center",
        backgroundColor: theme.colors.dark[4],
        padding: theme.spacing.sm,
        borderRadius: theme.radius.md,
        '&:hover': {
            cursor: "pointer",
            backgroundColor: theme.colors.dark[5]
        }
    }
}));

export const Shield = () => {

    const { classes } = useStyles();
    const [isOpen, handlers] = useDisclosure(false);

    const [isDisabled,setIsDisabled] = useAtom(shieldDisabledAtom);
    const [value,setValue] = useAtom(shieldValueAtom);

    const { t } = useTranslation("components", { "keyPrefix": "shield" })

    return(
        <Menu
            closeOnItemClick={false}
            opened={isOpen}
            onOpen={handlers.open}
            onClose={handlers.close}
        >
            <Menu.Target>
                <Tooltip label={t("shieldExplanations")}>
                    <Flex className={classes.container}>
                        {
                            !isDisabled ? 
                                <IconShieldCheck size={24} color={"green"} />
                            :
                                <IconShieldX size={24} color={"red"} />
                        }
                        <Text fw={700}>{`${(value*100).toFixed(0)}%`}</Text>
                    </Flex>
                </Tooltip>
            </Menu.Target>

            <Menu.Dropdown p={"sm"}>
                <Text fw={700} mb={10} >{t("shieldTitle")}</Text>
                <Flex gap={5} direction={"column"}>
                    <Flex align={"center"} gap={"sm"}>
                        <Text>{t("shieldActivate")}</Text>
                        <Checkbox checked={!isDisabled} onChange={() => setIsDisabled(!isDisabled)}/>
                    </Flex>
                    <NumberInput
                        label={t("shieldRate")}
                        hideControls={true}
                        value={value*100}
                        min={0}
                        max={100}
                        precision={0}
                        icon={<IconPercentage size={16}/>}
                        onChange={(value) => setValue(value ? value/100 : 0.05)}
                    />
                </Flex>
            </Menu.Dropdown>
        </Menu>
    )
}