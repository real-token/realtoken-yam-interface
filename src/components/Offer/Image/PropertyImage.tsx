import { Skeleton, Image} from "@mantine/core";
import { FC, useEffect, useState } from "react";
import { PropertiesToken } from "src/types";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import imageExists from "image-exists";

interface PropertyImageProps{
    property: PropertiesToken | undefined
}

const imageSize = 200;

export const PropertyImage: FC<PropertyImageProps> = ({ property }) => {

    const [imageExist,setImageExist] = useState<boolean>(false);
    useEffect(() => {
        imageExists(property ? property.imageLink[0] : "",(exist: boolean) => setImageExist(exist))
    },[property]);

    return(
        <>
        {
            property ? 
                <Image 
                    radius={"md"}
                    height={imageSize}
                    width={imageSize}
                    alt={""}
                    src={imageExist ? property.imageLink[0] : "https://realt.co/wp-content/uploads/2022/10/house-placeholder-150x150.jpg"}
                    fit={"cover"}
                />
            :
            <Skeleton width={250} height={250} radius={"md"}/>
        }
        </>
    )
}