import { ActionIcon, Group, Title, Text, Flex, Button, Skeleton, Badge } from "@mantine/core"
import { IconChevronDown, IconChevronUp, IconTrash,IconCopy } from "@tabler/icons"
import { ColumnDef, RowSelectionState, Table } from "@tanstack/react-table"
import BigNumber from "bignumber.js"
import { TFunction } from "react-i18next"
import { OfferPrice } from "src/components/Column/OfferPrice"
import { OfferYield } from "src/components/Column/OfferYield"
import { TokenName } from "src/components/Column/TokenName"
import { BuyActionsWithPermit } from "src/components/Market/BuyActions"
import { DeleteAdminAction } from "src/components/Market/DeleteActions/DeleteAdminAction"
import { ShowOfferAction } from "src/components/Market/ShowOfferAction/ShowOfferAction"
import { OfferTypeBadge } from "src/components/Offer/OfferTypeBadge/OfferTypeBadge"
import { Offer, OFFER_TYPE } from "src/types/offer"
import { getReduceAddress } from "src/utils/address"
import { ENV, isEnvs } from "src/utils/isEnv"
import moment from "moment"
import { DeleteActions } from "src/components/Market/DeleteActions"
import { UpdateActionsWithPermit } from "src/components/Market/UpdateActions"
import { OfferYieldDelta } from "src/components/Column/OfferYieldDelta"
import { OfferPriceDelta } from "src/components/Column/OfferPriceDelta"

type ColumnFn<T> = (t: TFunction<"buy","table">, span: number) => ColumnDef<Offer,T>

export const header = ({ title } : { title: string }) => {
    return (
        <Title order={4} style={{ textAlign: 'center' }}>
          {title} 
        </Title>
    )
}

export const adminHeader = (isAdmin: boolean, table: Table<Offer>, rowSelection: RowSelectionState, deleteOffers: () => void, { title } : { title: string }) => {

  const { getIsSomeRowsSelected, getIsAllRowsSelected } = table;

  return (
    <Flex justify={"space-between"}>
      { isAdmin ?
        <Button color={"red"} style={{ display: "flex", gap: 5 }} disabled={!getIsSomeRowsSelected() && !getIsAllRowsSelected()} onClick={() => deleteOffers()}>
          <Flex gap={"sm"} align={"center"}>
            <IconTrash size={16} />
            {`Delete ${Object.keys(rowSelection).length} selected offers`}
          </Flex>
        </Button>
        :
        undefined
      }
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
        id: 'offer-id',
        accessorKey: 'offerId',
        header: t('offerId'),
        cell: ({ row, getValue }) => { 
            return (
            <Group wrap="nowrap" gap={'xs'} justify="center">
                { row.original.buyerAddress ? <Badge>{t('privateTexte')}</Badge> : undefined }
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
                  undefined
                }
                <Text
                    size={'sm'}
                    style={{
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
        sortingFn: (rowA, rowB) => {
          const valueA = parseInt(rowA.original.offerId);
          const valueB = parseInt(rowB.original.offerId);
          return valueA - valueB;
        },
        meta: { colSpan: span },
    }
}

export const whitelistedColumn: ColumnFn<OFFER_TYPE> = (t,span) => {
  return{
    id: 'whitelisted',
    accessorFn: (offer) => offer.accountWhitelisted.toString(),
    header: "Whitelisted",
    enableColumnFilter: true,
    filterFn: 'equals',
    cell: ({ row }) => (
      <Flex>
        {/* {row.original.accountWhitelisted ? <Text>Yes</Text> : <Text>No</Text>} */}
        {row.original.accountWhitelisted.toString()}
      </Flex>
    )
  } as ColumnDef<Offer,OFFER_TYPE>
}

export const idPrivateColumn: ColumnFn<OFFER_TYPE> = (t,span) => {
  return{
      id: 'offer-id',
      accessorKey: 'offerId',
      header: t('offerId'),
      cell: ({ row, getValue }) => { 
          return (
          <Group wrap="nowrap" gap={'xs'}>
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
                  style={{
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
          <Flex justify={"center"}>
              {getValue()}
          </Flex>
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
          <Flex justify={"center"}>
            <Text
              size={'sm'}
              style={{
                textAlign: "center",
                textOverflow: 'ellipsis',
                overflow: 'hidden',
              }}
            >
              {getValue()}
            </Text>
          </Flex>
        ),
        enableSorting: true,
        meta: { colSpan: span },
      }
}

export const sellerAddressColumn: ColumnFn<string> = (t,span) => {
  const handleCopyClick = (textToCopy: string) => {
    navigator.clipboard.writeText(textToCopy)
      .then(() => setCopySuccess(true))
      .catch((err) => console.error('Error copying text: ', err));
  };
    return {
        id: 'sellerAddress',
        accessorKey: 'sellerAddress',
        header: t('sellerAddress'),
        cell: ({ getValue }) => (
          <Text
            size={'sm'}
            style={{
              textAlign: "center",
              textOverflow: 'ellipsis',
              overflow: 'hidden',
            }}
          >
            <Flex>
            {getReduceAddress(getValue())}
            <ActionIcon variant={"transparent"} color={"blue"} onClick={() => handleCopyClick(getValue())}>
              <IconCopy size={18} />
            </ActionIcon>
            </Flex>
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
        cell: ({ row }) => <OfferPrice offer={row.original}/>,
        enableSorting: true,
        enableGlobalFilter: true,
        meta: { colSpan: span },
      }
}

export const simplePriceColumn: ColumnFn<number> = (t,span) => {
  return {
      id: 'simple-price',
      accessorKey: 'price',
      header: t('price'),
      cell: ({ getValue }) => (
          <Text
              size={'sm'}
              style={{
              textAlign: 'center',
              textOverflow: 'ellipsis',
              overflow: 'hidden',
              }}
          >
              {getValue()}
          </Text>
      ),
      enableSorting: true,
      enableGlobalFilter: true,
      meta: { colSpan: span },
    }
}

export const priceDeltaColumn: ColumnFn<number> = (t,span) => {
  return {
    id: 'priceDelta',
    accessorFn: (offer) => offer.priceDelta !== undefined ? `${(offer.priceDelta*100).toFixed(2)}` : "",
    header: "Price delta",
    cell: ({ row }) => <OfferPriceDelta offer={row.original}/>,
    enableSorting: true,
    sortingFn: "alphanumeric",
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
            style={{
              textAlign: 'center',
              textOverflow: 'ellipsis',
              overflow: 'hidden',
            }}
          >
            {BigNumber(getValue()).toString(10)}
          </Text>
        ),
        sortingFn: (rowA, rowB) => {
          const valueA = parseFloat(rowA.original.amount);
          const valueB = parseFloat(rowB.original.amount);
          return valueA - valueB;
        },
        enableSorting: true,
        enableGlobalFilter: true,
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
          style={{
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
          style={{
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
        id: 'public-actions',
        header: "",
        cell: ({ row }) => (
          <Flex gap={"md"}>
            <BuyActionsWithPermit buyOffer={row.original}/>
            <ShowOfferAction offer={row.original}/>
          </Flex>
        ),
        enableSorting: false,
        enableGlobalFilter: false,
        meta: { colSpan: span },
    }
}

export const officialPriceColumn: ColumnFn<number|undefined> = (t,span) => {
    return{
        id: 'official-price',
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
        id: 'official-yield',
        header: "Official Yield",
        accessorKey: "officialYield",
        cell: ({ getValue }) => (
          getValue() !== undefined ?
            <Text
              size={'sm'}
              style={{
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
        sortingFn: "alphanumeric",
        enableGlobalFilter: true,
        meta: { colSpan: span },
      }
}

export const offerYieldColumn: ColumnFn<number> = (t,span) => {
    return{
        id: 'offer-yield',
        header: "Offer Yield",
        accessorFn: (offer) => offer.offerYield ? `${offer.offerYield.toFixed(2)}` : "",
        cell: ({ row }) => <OfferYield offer={row.original} />,
        enableSorting: true,
        sortingFn: "alphanumeric",
        enableGlobalFilter: true,
        meta: { colSpan: span },
      }
}

export const yieldDeltaColumn: ColumnFn<number> = (t,span) => {
  return{
    id: 'yield-delta',
        header: "Yield delta",
        accessorFn: (offer) => offer.yieldDelta,
        cell: ({ row }) => <OfferYieldDelta offer={row.original} />,
        enableSorting: true,
        sortingFn: (rowA, rowB) => {
          const valueA = parseFloat(rowA.original.yieldDelta?.toString() ?? '0');
          const valueB = parseFloat(rowB.original.yieldDelta?.toString() ?? '0');

          if(rowA.original.offerId == '41790'){
            console.log(valueA, valueB)
          }

          if(valueA == undefined || valueB == undefined) return -1;
          if(valueA == valueB) return 0;
          return valueA > valueB ? -1 : 1;
        },
        enableGlobalFilter: true,
        meta: { colSpan: span },
  }
}

export const offerShortTokenNameColumn: ColumnFn<unknown> = (t,span) => {
    return {
        id: 'offer-short-token-name',
        accessorKey: 'offerTokenName',
        header: t('offerTokenName'),
        cell: ({ row }) => <TokenName offer={row.original}/>,
        enableSorting: true,
        enableGlobalFilter: true,
        meta: { colSpan: span },
    }
}

export const exchangeOfferShortTokenNameColumn: ColumnFn<unknown> = (t,span) => {
  return {
      id: 'offer-token-name',
      accessorKey: 'offerTokenName',
      header: t('offerTokenName'),
      cell: ({ row }) => <TokenName offer={row.original} tokenName={row.original.offerTokenName}/>,
      enableSorting: true,
      enableGlobalFilter: true,
      meta: { colSpan: span },
  }
}

export const buyShortTokenNameColumn: ColumnFn<string> = (t,span) => {
    return {
        id: 'buyerTokenName',
        accessorKey: 'buyerTokenName',
        header: t('buyerTokenName'),
        cell: ({ row }) => <TokenName offer={row.original}/>,
        enableSorting: true,
        enableGlobalFilter: true,
        meta: { colSpan: span },
      }
}

export const exchangeBuyShortTokenNameColumn: ColumnFn<string> = (t,span) => {
  return {
      id: 'buyer-token-name',
      accessorKey: 'buyerTokenName',
      header: t('buyerTokenName'),
      cell: ({ row }) => <TokenName offer={row.original} tokenName={row.original.buyerTokenName}/>,
      enableSorting: true,
      enableGlobalFilter: true,
      meta: { colSpan: span },
    }
}

export const viewActionColumn: ColumnFn<unknown> = (t,span) => {
  return {
    id: 'view-action',
    header: undefined,
    cell: ({ row }) => <ShowOfferAction offer={row.original}/>,
    meta: { colSpan: span },
  }
}



// ADDRESS
export const deleteOfferActionColumn: ColumnFn<unknown> = (t,span) => {
  return{
    id: 'delete-action',
    header: t('actionDelete'),
    cell: ({ row }) => <DeleteActions deleteOffer={row.original} />,
    enableSorting: false,
    meta: { colSpan: span },
  };
}

export const modifyOfferActionColumn: ColumnFn<unknown> = (t,span) => {
  return {
    id: 'modify-action',
    header: t('actionEdit'),
    cell: ({ row }) => <UpdateActionsWithPermit updateOffer={row.original} />,
    enableSorting: false,
    meta: { colSpan: span },
  }
}

export const accountOfferActionsColumn: ColumnFn<unknown> = (t,span) => {
  return {
    id: 'actions',
    header: undefined,
    cell: ({ row }) => (
      <Flex gap={"md"}>
        <UpdateActionsWithPermit updateOffer={row.original} />
        <DeleteActions deleteOffer={row.original} />
        <ShowOfferAction offer={row.original}/>
      </Flex>
    ),
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
    header: t("onMarketSince"),
    cell: ({ getValue }) => (
      <Text
            size={'sm'}
            style={{
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

export const adminAmount: ColumnFn<string> = (t,span) => {
  return{
    id: 'admin-amount',
    accessorKey: 'amount',
    header: t('amount'),
    cell: ({ getValue }) => (
      <Text
            size={'sm'}
            style={{
              textAlign: 'right',
              textOverflow: 'ellipsis',
              overflow: 'hidden',
            }}
          >
        { getValue() ?
          <Text>{getValue()}</Text>
        :
        <Skeleton height={15} />
        }
      </Text>
    ),
    enableSorting: true,
    meta: { colSpan: span },
  }
}

export const adminWalletBlanace: ColumnFn<string> = (t,span) => {
  return{
    id: 'admin-wallet-balance',
    accessorKey: 'balanceWallet',
    header: t('walletBalance'),
    cell: ({ getValue }) => (
      <Text
            size={'sm'}
            style={{
              textAlign: 'right',
              textOverflow: 'ellipsis',
              overflow: 'hidden',
            }}
          >
        { getValue() ?
          <Text>{getValue()}</Text>
        :
        <Skeleton height={15} />
        }
      </Text>
    ),
    enableSorting: true,
    meta: { colSpan: span },
  }
}

export const adminAllowance: ColumnFn<number> = (t,span) => {
  return{
    id: 'admin-allowance',
    accessorKey: "allowanceToken",
    header: t("allowance"),
    cell: ({ getValue }) => (
      <Text
            size={'sm'}
            style={{
              textAlign: 'right',
              textOverflow: 'ellipsis',
              overflow: 'hidden',
            }}
          >
        { getValue() ?
          <Text>{getValue()}</Text>
        :
        <Skeleton height={15} />
        }
      </Text>
    ),
    meta: { colSpan: span },
  }
}
function setCopySuccess(arg0: boolean): any {
  throw new Error("Function not implemented.")
}
