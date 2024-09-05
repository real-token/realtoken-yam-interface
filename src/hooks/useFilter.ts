import { toLower, isString, isBoolean, isNumber } from "lodash";
import { Offer } from "src/types/offer";

const skipedKey = [
    "offerTokenAddress",
    "offerTokenDecimals",
    "buyerTokenAddress",
    "buyerTokenDecimals",
    "createdAtTimestamp",
    "buyCurrency"
];

const filterDatas = (filterValue: string, datas: Offer[]) => {
    if(!filterValue) return datas;

    return datas.filter((data: Offer) => {
        return Object.keys(data).map(key => {
            if(skipedKey.includes(key)) return false;

            const value = data[key as keyof typeof data];

            if(isString(value)){
                return toLower(value).includes(toLower(filterValue))
            }

            if (isBoolean(value)) {
                return (filterValue === 'true' && value) || (filterValue === 'false' && !value)
            }

            if (isNumber(value)) {
                return value.toString() == filterValue
            }

            return false
        }).includes(true);
    });
}

interface UseFilter{
    filteredDatas: Offer[]
}

export const useFilter = (filterValue: string, datas: Offer[]): UseFilter => {

    return {
        filteredDatas: filterDatas(filterValue,datas)
    }
}

export const useHideDustFilter = (
  hideDust: boolean,
  datas: Offer[]
): UseFilter => {
  return {
    filteredDatas: hideDust
      ? datas.filter((data: Offer) => Number(data.amount) > 0.1)
      : datas,
  };
};
