type AsConst = <T>() => <V extends T>(value: V) => V;

export const asConst: AsConst = () => (value) => value;
