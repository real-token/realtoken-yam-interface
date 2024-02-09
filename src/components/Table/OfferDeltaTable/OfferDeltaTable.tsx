import { Skeleton, Text } from "@mantine/core";
import { Offer, OFFER_TYPE } from "src/types/offer";
import classes from './OfferDeltaTable.module.css';

interface OfferDeltaTableProps{
    offer: Offer, 
    officialPrice: number|undefined,
    officialYield: number|undefined,
    offerPrice: number|undefined,
    offerYield: number|undefined,
}
export const OfferDeltaTable = ({ offer, officialPrice, officialYield, offerPrice, offerYield }: OfferDeltaTableProps) => {

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