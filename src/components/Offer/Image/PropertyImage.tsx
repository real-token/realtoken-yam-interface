import { FC, useEffect, useState } from 'react';

import { Image, Skeleton } from '@mantine/core';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import imageExists from 'image-exists';

import { PropertiesToken } from 'src/types';

interface PropertyImageProps {
  property: PropertiesToken | undefined;
}

const imageSize = 200;

export const PropertyImage: FC<PropertyImageProps> = ({ property }) => {
  const [imageExist, setImageExist] = useState<boolean>(false);
  useEffect(() => {
    imageExists(
      property ? (property.imageLink ? property.imageLink[0] : '') : '',
      (exist: boolean) => setImageExist(exist)
    );
  }, [property]);

  return (
    <>
      {property ? (
        <Image
          radius={'md'}
          height={imageSize}
          width={imageSize}
          alt={''}
          src={
            imageExist
              ? property.imageLink[0]
              : 'https://cleansatmining.com/data/files/logo_csm.png'
          }
          fit={'cover'}
        />
      ) : (
        <Skeleton width={250} height={250} radius={'md'} />
      )}
    </>
  );
};
