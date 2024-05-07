import React from "react"
import { SVG } from "../types/Svg"

export const RegLogo = ({ width }: SVG) => {
    return (
        <img alt={'Reg token logo'} src="REG.png" style={{ width: width ?? 24 }}/>
    )
}