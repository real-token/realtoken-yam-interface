import { Image, Skeleton} from "@mantine/core";
import { FC } from "react";
import { PropertiesToken } from "src/types";

interface PropertyImageProps{
    property: PropertiesToken | undefined
}

const imageSize = 200;

export const PropertyImage: FC<PropertyImageProps> = ({ property }) => {
    return(
        <>
        {
            property ? 
                <Image 
                    radius={"md"}
                    height={imageSize}
                    width={imageSize}
                    src={property ? property.imageLink[0] : ""}
                    alt={property ? property.fullName : ""}
                    fit={"cover"}
                />
            :
            <Skeleton width={250} height={250} radius={"md"}/>
        }
        </>
    )
}