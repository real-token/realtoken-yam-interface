/* eslint-disable prefer-const */
export const hexToRgb = (color: string, opacity?: number) : string => {
    let hex : any = color.replace("#","");
    hex = '0x' + hex
    let r = hex >> 16 & 0xFF
    let g = hex >> 8 & 0xFF
    let b = hex & 0xFF
    return `rgb(${r}, ${g}, ${b}, ${opacity ? opacity : 1})`
}