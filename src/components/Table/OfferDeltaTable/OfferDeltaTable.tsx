import { createStyles, Skeleton, Text } from "@mantine/core";
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
    offer: Offer, 
    officialPrice: number|undefined,
    officialYield: number|undefined,
    offerPrice: number|undefined,
    offerYield: number|undefined,
}
export const OfferDeltaTable = ({ offer, officialPrice, officialYield, offerPrice, offerYield }: OfferDeltaTableProps) => {

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
                    <td className={classes.tableCell}>
                        { officialYield ? `${officialYield.toFixed(2)}%` : <Skeleton height={15}/> }
                    </td>
                    { offer.type !== OFFER_TYPE.EXCHANGE ? 
                        <td className={classes.tableCell}>
                            { offerYield ? <Text>{`${offerYield.toFixed(2)}%`}</Text> : <Skeleton height={15}/> }
                        </td> 
                        : 
                        undefined 
                    }
                </tr>
                <tr>
                    <td className={classes.tableCell}>Price</td>
                    <td className={classes.tableCell}>
                        { officialPrice ? officialPrice : <Skeleton height={15}/> }
                    </td>
                    { offer.type !== OFFER_TYPE.EXCHANGE ? 
                        <td className={classes.tableCell}>
                            { offerPrice !== undefined ? 
                                `${offerPrice}` 
                                : 
                                <Skeleton height={15}/>
                            }
                        </td> 
                        :
                        undefined 
                    }
                </tr>
            </tbody>
        </table>
    )
}