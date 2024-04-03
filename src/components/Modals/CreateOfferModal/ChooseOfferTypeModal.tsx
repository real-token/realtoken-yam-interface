/* eslint-disable react/display-name */
import { Button, Flex, Text, Tooltip } from '@mantine/core';
import { ContextModalProps, useModals } from '@mantine/modals';
import { IconInfoCircle } from '@tabler/icons';
import { Dispatch, FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useOfferType } from 'src/hooks/useOfferType';
import { OFFER_TYPE } from 'src/types/offer';
import { calcRem } from 'src/utils/style';
import classes from './OfferTypePane.module.css';
import styled from 'styled-components';

const OfferTypePaneStyled = styled('div')<{ $isSelected: boolean }>`
  display: flex;
  height: 6rem;
  width: 33%;
  padding: 7px;
  border: 3px;
  border-style: solid;
  border-width: 3px;
  border-radius: var(--mantine-radius-lg);
  border-color: ${({ $isSelected }) => ($isSelected ? 'light-dark("black","white")' : "transparent" )};
`;

interface OfferTypePaneProps{
  setOfferType: Dispatch<OFFER_TYPE|undefined>;
  selectedOfferType: OFFER_TYPE|undefined;
  offerType: OFFER_TYPE;
}
const OfferTypePane: FC<OfferTypePaneProps> = ({ offerType, selectedOfferType, setOfferType }) => {

  const { getColor, getI18OfferTypeName } = useOfferType();

  const isSelected = offerType == selectedOfferType;
  const backgroundColor = getColor(offerType) ?? "";

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
      <OfferTypePaneStyled $isSelected={isSelected}>
        <Flex
          onClick={() => setO()}
          style={(theme) => ({
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
              backgroundColor: `darken(${backgroundColor},0.4)`,
              cursor: "pointer"
            }
          })}
        >
          <div className={classes.info}><IconInfoCircle size={20} color={"white"}/></div>
          <Text c={"white"} fw={700}>{getI18OfferTypeName(offerType)}</Text>
        </Flex>
      </OfferTypePaneStyled>
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