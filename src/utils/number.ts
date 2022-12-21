export const getNumberDecimals = (value: string) : number => {
    const parsed = value.replaceAll('0','1').split(".");
    if(!parsed[1]){
        return 0;
    }else{
        return parsed[1].length;
    }
}

export const getNumberOfZero = (value: string) : number => {
    const numberOfZero = parseFloat(value) > 0 ? -Math.floor( Math.log10(parseFloat(value)) + 1) : 0;
    return numberOfZero
}

export const cleanNumber = (number: string|number) : string => {
    const n = parseFloat(number.toString());
    const numberOfDecimals = getNumberDecimals(n.toString());
    return n.toFixed(Math.abs(numberOfDecimals));
}