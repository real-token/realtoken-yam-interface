import { createStyles } from "@mantine/core";
import { OfferPrice } from "src/components/Column/OfferPrice";
import { OfferYield } from "src/components/Column/OfferYield";
import { OfficialPrice } from "src/components/Column/OfficialPrice";
import { OriginalYield } from "src/components/Column/OriginalYield";
import { Offer, OFFER_TYPE } from "src/types/offer";
import { calcRem } from "src/utils/style";

const useStyle = createStyles((theme) => ({
    table: {
        width: "100%",
        borderWidth: "1px",
        borderStyle: "solid",
        borderColor: theme.colors.brand,
        borderRadius: theme.radius.md,
        overflow: "hidden",
        padding: 0,
        borderSpacing: 0
    },
    tableHead: {
        backgroundColor: theme.colors.brand,
        borderWidth: "1px",
        borderStyle: "solid",
        borderColor: theme.colors.brand,
    },
    tableCell: {
        padding: calcRem(5),
        textAlign: "center",
        borderWidth: "1px",
        borderStyle: "solid",
        borderColor: theme.colors.brand,
    }   
}));

interface OfferDeltaTableProps{
    offer: Offer
}
export const OfferDeltaTable = ({ offer }: OfferDeltaTableProps) => {

    const { classes } = useStyle();

    return(
        <table className={classes.table}>
            <thead className={classes.tableHead}>
                <tr>
                    <th className={classes.tableCell}></th>
                    <th className={classes.tableCell}>Original</th>
                    { offer.type !== OFFER_TYPE.EXCHANGE ? <th className={classes.tableCell}>Offer</th> : undefined }
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td className={classes.tableCell}>Yield</td>
                    <td className={classes.tableCell}><OriginalYield offer={offer}/></td>
                    { offer.type !== OFFER_TYPE.EXCHANGE ? <td className={classes.tableCell}><OfferYield offer={offer}/></td> : undefined }
                </tr>
                <tr>
                    <td className={classes.tableCell}>Price</td>
                    <td className={classes.tableCell}><OfficialPrice offer={offer}/></td>
                    { offer.type !== OFFER_TYPE.EXCHANGE ? <td className={classes.tableCell}><OfferPrice offer={offer}/></td> : undefined }
                </tr>
            </tbody>
        </table>
    )
}