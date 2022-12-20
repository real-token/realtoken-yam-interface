
export const getNumberOfZero = (value: string) : number => {
    const numberOfZero = parseFloat(value) > 0 ? -Math.floor( Math.log10(parseFloat(value)) + 1) : 0;
    return numberOfZero
} 

export const cleanNumber = (number: string|number) : string => {
    const n = parseFloat(number.toString());
    const numberOfDecimal = getNumberOfZero(n.toString());
    return n.toFixed(Math.abs(numberOfDecimal));
}