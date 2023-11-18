import { Badge, Flex, Sx, Text, createStyles } from '@mantine/core';

import { useOfferType } from 'src/hooks/useOfferType';
import { OFFER_TYPE } from 'src/types/offer';

interface StyleProps {
  offerTypeColor: string;
}

const useStyle = createStyles((theme, { offerTypeColor }: StyleProps) => ({
  offerType: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: offerTypeColor,
    borderRadius: theme.radius.md,
    fontWeight: 700,
    padding: `0 ${theme.spacing.sm}`,
    color: 'white',
  },
}));

interface OfferTypeBadgeProps {
  offerType: OFFER_TYPE | undefined;
  textSize?: number;
  style?: any;
  id?: string;
  sx?: Sx;
  radius?: string | number;
}
export const OfferTypeBadge = ({ offerType, sx }: OfferTypeBadgeProps) => {
  const { getColorCode, getI18OfferTypeName } = useOfferType();
  const { classes } = useStyle({
    offerTypeColor: offerType ? getColorCode(offerType) ?? 'blue' : 'blue',
  });

  return (
    <>
      {offerType ? (
        <Flex className={classes.offerType} sx={sx}>
          {getI18OfferTypeName(offerType)?.toUpperCase()}
        </Flex>
      ) : undefined}
    </>
  );
};

export const OfferBadge = ({
  offerType,
  style,
  id,
  sx,
  radius = 0,
}: OfferTypeBadgeProps) => {
  const { getColor, getI18OfferTypeName } = useOfferType();

  return (
    <Badge
      color={offerType ? getColor(offerType) ?? 'red' : 'blue'}
      radius={radius}
      variant={'filled'}
      style={style}
      sx={sx}
    >
      {(offerType ? getI18OfferTypeName(offerType)?.toUpperCase() : '') +
        (id ? ' #' + id : '')}
    </Badge>
  );
};

export const OfferBadgeAbsolute = ({
  offerType,
  id,
  sx,
  radius = 0,
}: OfferTypeBadgeProps) => {
  return (
    <div
      style={{
        position: 'absolute',
        top: '0px',
        left: '0px',
      }}
    >
      <OfferBadge
        offerType={offerType}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          borderBottomRightRadius: '10px',
        }}
        id={id}
        radius={radius}
        sx={sx}
      ></OfferBadge>
    </div>
  );
};

export const OfferText = ({
  offerType,
  textSize,
  style,
  id,
  sx,
}: OfferTypeBadgeProps) => {
  const { getI18OfferTypeName } = useOfferType();

  return (
    <Text fz={textSize} style={style} sx={sx}>
      {(offerType ? getI18OfferTypeName(offerType)?.toUpperCase() : '') +
        (id ? ' #' + id : '')}
    </Text>
  );
};
