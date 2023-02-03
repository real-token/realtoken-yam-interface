import { ActionIcon, Group, Title, Text, Flex, Button, Skeleton } from "@mantine/core"
import { IconChevronDown, IconChevronUp, IconTrash } from "@tabler/icons"
import { ColumnDef, RowSelectionState, Table } from "@tanstack/react-table"
import BigNumber from "bignumber.js"
import { TFunction } from "react-i18next"
import { OfferPrice } from "src/components/Column/OfferPrice"
import { OfferYield } from "src/components/Column/OfferYield"
import { OffialPrice } from "src/components/Column/OfficialPrice"
import { OriginalYield } from "src/components/Column/OriginalYield"
import { TokenName } from "src/components/Column/TokenName"
import { BuyActionsWithPermit } from "src/components/Market/BuyActions"
import { DeleteAdminAction } from "src/components/Market/DeleteActions/DeleteAdminAction"
import { ShowOfferAction } from "src/components/Market/ShowOfferAction/ShowOfferAction"
import { OfferTypeBadge } from "src/components/Offer/OfferTypeBadge"
import { Offer, OFFER_TYPE } from "src/types/offer"
import { getReduceAddress } from "src/utils/address"
import { ENV, isEnvs } from "src/utils/isEnv"
import moment from "moment"

type ColumnFn<T> = (t: TFunction<"buy","table">, span: number) => ColumnDef<Offer,T>

export const header = ({ title } : { title: string }) => {
    return (
        <Title order={4} style={{ textAlign: 'center' }}>
          {title} 
        </Title>
    )
}

export const adminHeader = (table: Table<Offer>, rowSelection: RowSelectionState, deleteOffers: () => void, { title } : { title: string }) => {

  const { getIsSomeRowsSelected, getIsAllRowsSelected } = table;

  return (
    <Flex justify={"space-between"}>
      <Button color={"red"} style={{ display: "flex", gap: 5 }} disabled={!getIsSomeRowsSelected() && !getIsAllRowsSelected()} onClick={() => deleteOffers()}>
        <Flex gap={"sm"} align={"center"}>
          <IconTrash size={16} />
          {`Delete ${Object.keys(rowSelection).length} selected offers`}
        </Flex>
      </Button>
      <Title order={4} style={{ flexGrow:1, textAlign: 'center' }}>
        {title} 
      </Title>
    </Flex>
  )
}

export const typeColumn: ColumnDef<Offer,OFFER_TYPE> = {
    id: "offerType",
    accessorKey: 'type',
    header: "Type",
    cell: ({ getValue }) => {
        return(<OfferTypeBadge offerType={getValue()} textSize={10}/>)
    },
    meta: { colSpan: 1 },
    enableSorting: false,
}

export const idColumn: ColumnFn<OFFER_TYPE> = (t,span) => {
    return{
        id: 'offerId',
        accessorKey: 'offerId',
        header: t('offerId'),
        cell: ({ row, getValue }) => { 
            return (
            <Group noWrap={true} spacing={'xs'}>
                { row.original.hasPropertyToken && isEnvs([ENV.DEV]) ?
                <ActionIcon
                    variant={'transparent'}
                    color={'brand'}
                    onClick={() => row.toggleExpanded()}
                >
                    {row.getIsExpanded() ? (
                    <IconChevronUp size={16} />
                    ) : (
                    <IconChevronDown size={16} />
                    )}
                </ActionIcon>
                :
                <ActionIcon variant={'transparent'} color={'brand'} disabled={true}/>
                }
                <Text
                    size={'sm'}
                    sx={{
                    textOverflow: 'ellipsis',
                    overflow: 'hidden',
                    }}
                >
                    {getValue()}
                </Text>
            </Group>
            )
        },
        enableSorting: true,
        meta: { colSpan: span },
    }
}

export const offerTokenNameColumn: ColumnFn<string> = (t,span) => {
    return {
        id: 'offerTokenName',
        accessorKey: 'offerTokenName',
        header: t('offerTokenName'),
        cell: ({ getValue }) => (
          <Group noWrap={true} spacing={'xs'}>
            <Text
              size={'sm'}
              sx={{
                textOverflow: 'ellipsis',
                overflow: 'hidden',
              }}
            >
              {getValue()}
            </Text>
          </Group>
        ),
        enableSorting: true,
        meta: { colSpan: span },
    }
}

export const buyerTokenNameColumn: ColumnFn<string> = (t,span) => {
    return {
        id: 'buyerTokenName',
        accessorKey: 'buyerTokenName',
        header: t('buyerTokenName'),
        cell: ({ getValue }) => (
          <Group noWrap={true} spacing={'xs'}>
            <Text
              size={'sm'}
              sx={{
                textOverflow: 'ellipsis',
                overflow: 'hidden',
              }}
            >
              {getValue()}
            </Text>
          </Group>
        ),
        enableSorting: true,
        meta: { colSpan: span },
      }
}

export const sellerAddressColumn: ColumnFn<string> = (t,span) => {
    return {
        id: 'sellerAddress',
        accessorKey: 'sellerAddress',
        header: t('sellerAddress'),
        cell: ({ getValue }) => (
          <Group noWrap={true} spacing={'xs'}>
            <Text
              size={'sm'}
              sx={{
                textOverflow: 'ellipsis',
                overflow: 'hidden',
              }}
            >
              {getReduceAddress(getValue())}
            </Text>
          </Group>
        ),
        enableSorting: true,
        meta: { colSpan: span },
      }
}

export const priceColumn: ColumnFn<number> = (t,span) => {
    return {
        id: 'price',
        accessorKey: 'price',
        header: t('price'),
        cell: ({ getValue, row }) => (
            <Text
                size={'sm'}
                sx={{
                textAlign: 'center',
                textOverflow: 'ellipsis',
                overflow: 'hidden',
                }}
            >
                <OfferPrice offer={row.original}/>
            </Text>
        ),
        enableSorting: true,
        meta: { colSpan: span },
      }
}

export const amountColumn: ColumnFn<string> = (t,span) => {
    return{
        id: 'amount',
        accessorKey: 'amount',
        header: t('amount'),
        cell: ({ getValue }) => (
          <Text
            size={'sm'}
            sx={{
              textAlign: 'center',
              textOverflow: 'ellipsis',
              overflow: 'hidden',
            }}
          >
            {BigNumber(getValue()).toString(10)}
          </Text>
        ),
        enableSorting: true,
        meta: { colSpan: span },
    }
}

export const walletBalanceColumn: ColumnFn<string> = (t,span) => {
  return{
      id: 'wallet-balance',
      accessorKey: 'balanceWallet',
      header: t('walletBalance'),
      cell: ({ getValue }) => (
        <Text
          size={'sm'}
          sx={{
            textAlign: 'center',
            textOverflow: 'ellipsis',
            overflow: 'hidden',
          }}
        >
          {BigNumber(getValue()).toString(10)}
        </Text>
      ),
      enableSorting: true,
      meta: { colSpan: span },
  }
}

export const allowanceColumn: ColumnFn<string> = (t,span) => {
  return{
      id: 'allowance',
      accessorKey: 'allowanceToken',
      header: t('allowance'),
      cell: ({ getValue }) => (
        <Text
          size={'sm'}
          sx={{
            textAlign: 'center',
            textOverflow: 'ellipsis',
            overflow: 'hidden',
          }}
        >
          {BigNumber(getValue()).toString(10)}
        </Text>
      ),
      enableSorting: true,
      meta: { colSpan: span },
  }
}

export const publicActionsColumn: ColumnFn<unknown> = (t,span) => {
    return{
        id: 'actions',
        header: undefined,
        cell: ({ row }) => (
          <Flex gap={"md"}>
            <BuyActionsWithPermit buyOffer={row.original}/>
            <ShowOfferAction offer={row.original}/>
          </Flex>
        ),
        meta: { colSpan: span },
    }
}

export const officialPriceColumn: ColumnFn<unknown> = (t,span) => {
    return{
        id: 'officialPrice',
        header: "Official price",
        cell: ({ row }) => <OffialPrice offer={row.original} />,
        meta: { colSpan: span },
    }
}

export const originalYieldColumn: ColumnFn<unknown> = (t,span) => {
    return{
        id: 'originalYield',
        header: "Original Yield",
        cell: ({ row }) => <OriginalYield offer={row.original} />,
        meta: { colSpan: span },
      }
}

export const offerYieldColumn: ColumnFn<unknown> = (t,span) => {
    return{
        id: 'offerYield',
        header: "Offer Yield",
        cell: ({ row }) => <OfferYield offer={row.original} />,
        meta: { colSpan: span },
      }
}

export const buyShortTokenNameColumn: ColumnFn<unknown> = (t,span) => {
    return {
        id: 'offerShortTokenName',
        accessorKey: 'offerTokenName',
        header: t('offerTokenName'),
        cell: ({ row }) => <TokenName offer={row.original}/>,
        enableSorting: true,
        meta: { colSpan: span },
    }
}

export const offerShortTokenNameColumn: ColumnFn<string> = (t,span) => {
    return {
        id: 'buyerShortTokenName',
        accessorKey: 'buyerTokenName',
        header: t('buyerTokenName'),
        cell: ({ row }) => <TokenName offer={row.original}/>,
        enableSorting: true,
        meta: { colSpan: span },
      }
}

// ADMIN
export const adminActionsColumn: ColumnFn<unknown> = (t,span) => {
  return{
    id: 'admin-actions',
    header: undefined,
    cell: ({ row }) => (
      <Flex gap={"md"}>
        <DeleteAdminAction deleteOffer={row.original}/>
      </Flex>
    ),
    meta: { colSpan: span },
  }
}

export const offerDateColumn: ColumnFn<number> = (t,span) => {
  return{
    id: 'offer-date',
    accessorKey: "createdAtTimestamp",
    header: "On market since",
    cell: ({ getValue }) => (
      <Text
            size={'sm'}
            sx={{
              textAlign: 'center',
              textOverflow: 'ellipsis',
              overflow: 'hidden',
            }}
          >
        { getValue() ?
          <Text>{`${moment().diff(moment.unix(getValue()),"days")}j`}</Text>
        :
        <Skeleton height={15} />
        }
      </Text>
    ),
    meta: { colSpan: span },
  }
}