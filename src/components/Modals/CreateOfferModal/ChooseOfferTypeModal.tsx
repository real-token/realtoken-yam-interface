/* eslint-disable react/display-name */
import { Button, createStyles, Flex, Text, Tooltip } from '@mantine/core';
import { ContextModalProps, useModals } from '@mantine/modals';
import { IconInfoCircle } from '@tabler/icons';
import { Dispatch, FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useOfferType } from 'src/hooks/useOfferType';
import { OFFER_TYPE } from 'src/types/offer';
import { calcRem } from 'src/utils/style';

interface OfferTypePaneStyleProps{
  backgroundColor: string;
  isSelected: boolean
}
const offerTypePaneStyle = createStyles((theme, { backgroundColor, isSelected }: OfferTypePaneStyleProps) => ({
  selected: {
    display: "flex",
    height: calcRem(100),
    width: "33%",
    padding: "7px",
    borderStyle: "solid",
    borderWidth: "3px",
    borderRadius: theme.radius.lg,
    borderColor: isSelected ? "white" : "transparent"
  },
  container: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    backgroundColor: backgroundColor,
    // padding: theme.spacing.sm,
    borderRadius: theme.radius.md,
    '&:hover':{
      backgroundColor: theme.fn.darken(backgroundColor,0.4),
      cursor: "pointer"
    }
  },
  info:{
    position: "absolute",
    top: "0",
    marginRight: "8px",
    marginTop: "5px",
    display: "flex",
    justifyContent: "end",
    width: "100%"
  }
}));

interface OfferTypePaneProps{
  setOfferType: Dispatch<OFFER_TYPE|undefined>;
  selectedOfferType: OFFER_TYPE|undefined;
  offerType: OFFER_TYPE;
}
const OfferTypePane: FC<OfferTypePaneProps> = ({ offerType, selectedOfferType, setOfferType }) => {

  const { getColor, getI18OfferTypeName } = useOfferType();
  const { classes } = offerTypePaneStyle({ 
    backgroundColor: getColor(offerType) ?? "",
    isSelected: offerType == selectedOfferType
  })

  const { t } = useTranslation("modals", { keyPrefix: "chooseOfferType" });

  const tooltipText: Map<OFFER_TYPE,string> = new Map<OFFER_TYPE,string>([
    [OFFER_TYPE.BUY, t("buyTypeExplain",{ offerType: getI18OfferTypeName(offerType) })],
    [OFFER_TYPE.SELL, t("sellTypeExplain", { offerType: getI18OfferTypeName(offerType)})],
    [OFFER_TYPE.EXCHANGE, t("exchangeTypeExplain", { offerType: getI18OfferTypeName(offerType)})]
  ])

  const setO = () => {
    setOfferType(selectedOfferType != offerType ? offerType : undefined);
  }

  return(
    <Tooltip label={tooltipText.get(offerType)} position={"bottom"} multiline={true}>
      <Flex className={classes.selected}>
        <Flex
          onClick={() => setO()}
          className={classes.container}
        >
          <div className={classes.info}><IconInfoCircle size={20} color={"white"}/></div>
          <Text color={"white"} fw={700}>{getI18OfferTypeName(offerType)}</Text>
        </Flex>
      </Flex>
    </Tooltip>
  )
}

export const ChooseOfferTypeModal: FC<ContextModalProps> = ({
  id
}) => {

  const [offerType,setOfferType] = useState<OFFER_TYPE|undefined>(undefined); 
  const modals = useModals();

  const openCreateOfferModal = () => {
    modals.closeModal(id)
    modals.openContextModal('createOffer',{innerProps: {
      offer: {
        offerType
      }
    }});
  }

  const { t: commonT } = useTranslation("common", { keyPrefix: "general" });
  const { t } = useTranslation("modals", { keyPrefix: "chooseOfferType" });
   
  return (
    <Flex direction={"column"} gap={"xl"} style={{ width: calcRem(400) }}>
      <Text>{t("title")}</Text>
      <Flex justify={"center"} mb={15}>
        <OfferTypePane offerType={OFFER_TYPE.SELL} selectedOfferType={offerType} setOfferType={setOfferType}/>
        <OfferTypePane offerType={OFFER_TYPE.BUY} selectedOfferType={offerType} setOfferType={setOfferType}/>
        <OfferTypePane offerType={OFFER_TYPE.EXCHANGE} selectedOfferType={offerType} setOfferType={setOfferType}/>
      </Flex>
      <Flex justify={"end"} style={{ width: "100%" }}>
        <Button disabled={offerType == undefined} onClick={() => openCreateOfferModal()}>{commonT("nextButton")}</Button>
      </Flex>
    </Flex>
  );
};