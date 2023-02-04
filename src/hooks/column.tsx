import { ActionIcon, Group, Title, Text, Flex, Skeleton } from "@mantine/core"
import { IconChevronDown, IconChevronUp } from "@tabler/icons"
import { ColumnDef } from "@tanstack/react-table"
import BigNumber from "bignumber.js"
import { TFunction } from "react-i18next"
import { OfferPrice } from "src/components/Column/OfferPrice"
import { OfferYield } from "src/components/Column/OfferYield"
import { TokenName } from "src/components/Column/TokenName"
import { BuyActionsWithPermit } from "src/components/Market/BuyActions"
import { ShowOfferAction } from "src/components/Market/ShowOfferAction/ShowOfferAction"
import { OfferTypeBadge } from "src/components/Offer/OfferTypeBadge"
import { Offer, OFFER_TYPE } from "src/types/offer"
import { getReduceAddress } from "src/utils/address"
import { ENV, isEnvs } from "src/utils/isEnv"

type ColumnFn<T> = (t: TFunction<"buy","table">, span: number) => ColumnDef<Offer,T>

export const header = ({ title } : { title: string }) => {
    return (
        <Title order={4} style={{ textAlign: 'center' }}>
          {title} 
        </Title>
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
          <Text
            size={'sm'}
            sx={{
              textAlign: "center",
              textOverflow: 'ellipsis',
              overflow: 'hidden',
            }}
          >
            {getReduceAddress(getValue())}
          </Text>
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
        cell: ({ row }) => (
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
        enableGlobalFilter: true,
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
        enableGlobalFilter: true,
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

export const officialPriceColumn: ColumnFn<number|undefined> = (t,span) => {
    return{
        id: 'officialPrice',
        header: "Official price",
        accessorKey: "officialPrice",
        cell: ({ row }) => (
            row.original.officialPrice ?
              <Text>
                {`${row.original.officialPrice} $${row.original.buyCurrency}`}
              </Text>
            :
              <Skeleton height={15} />
          ),
        enableColumnFilter: true,
        enableSorting: true,
        meta: { colSpan: span },
    }
}

export const officialYieldColumn: ColumnFn<number|undefined> = (t,span) => {
    return{
        id: 'officialYield',
        header: "Official Yield",
        accessorKey: "officialYield",
        cell: ({ getValue }) => (
          getValue() !== undefined ?
            <Text
              size={'sm'}
              sx={{
                textAlign: 'center',
                textOverflow: 'ellipsis',
                overflow: 'hidden',
              }}
            >
              {`${getValue()?.toFixed(2)}%`}
            </Text>
          :
            <Skeleton height={15} />
        ),
        enableSorting: true,
        enableGlobalFilter: true,
        meta: { colSpan: span },
      }
}

export const offerYieldColumn: ColumnFn<unknown> = (t,span) => {
    return{
        id: 'offerYield',
        header: "Offer Yield",
        cell: ({ row }) => <OfferYield offer={row.original} />,
        enableSorting: true,
        enableGlobalFilter: true,
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
        enableGlobalFilter: true,
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
        enableGlobalFilter: true,
        meta: { colSpan: span },
      }
}