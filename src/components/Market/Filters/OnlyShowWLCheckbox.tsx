import { useAtom } from "jotai";
import { Checkbox } from "@mantine/core";
import { showOnlyWhitelistedAtom } from "../../../states";
import { FC } from "react";
import { useTranslation } from "react-i18next";

export const ShowOnlyWlCheckbox: FC = () => {

    const { t } = useTranslation('table', { keyPrefix: 'filters' });

    const [showOnlyWhitelisted, setShowOnlyWhitelisted] = useAtom(showOnlyWhitelistedAtom);

    return(
        <Checkbox
            label={t('showOnlyWhitelisted')}
            checked={showOnlyWhitelisted}
            onChange={(event) => {
                setShowOnlyWhitelisted(event.currentTarget.checked)
            }}
        />
    )
}