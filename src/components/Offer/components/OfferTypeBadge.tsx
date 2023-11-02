import { Badge, Flex, Sx, createStyles } from '@mantine/core';

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
  offerType: OFFER_TYPE;
  textSize?: number;
  style?: any;
  id?: string;
  sx?: Sx;
  radius?: string | number;
}
export const OfferTypeBadge = ({ offerType, sx }: OfferTypeBadgeProps) => {
  const { getColorCode, getI18OfferTypeName } = useOfferType();
  const { classes } = useStyle({
    offerTypeColor: getColorCode(offerType) ?? 'blue',
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
      color={getColor(offerType) ?? 'red'}
      radius={radius}
      variant={'filled'}
      style={style}
      sx={sx}
    >
      {getI18OfferTypeName(offerType)?.toUpperCase() + (id ? ' #' + id : '')}
    </Badge>
  );
};
