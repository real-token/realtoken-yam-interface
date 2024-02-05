import { Flex, Text, Anchor, Button } from "@mantine/core";
import { IconDownload } from "@tabler/icons";
import { useRootStore } from "../../src/zustandStore/store"
import { IconExclamationCircle } from "@tabler/icons";
import { ColumnDef, PaginationState, getCoreRowModel, getPaginationRowModel, useReactTable } from "@tanstack/react-table";
import { useMemo, useState } from "react";
import { Table } from "../../src/components/Table";
import { getReduceAddress } from "../../src/utils/address";
import { CHAINS, ChainsID } from "../../src/constants";
import moment from "moment";
import { HistoricTokenSummary } from "../../src/components/historic/HistoricTokenSummary";
import { stringify } from 'csv-stringify/sync';
import { saveAs } from 'file-saver';
import { useWeb3React } from "@web3-react/core";
import { Historic } from "../../src/types/historic";
import { useTranslation } from "react-i18next";

export default function HistoricPage(){

    const [
        historics,
        historicHasLoadingError,
        historicsAreLoading,
        properties,
        chainId
    ] = useRootStore((state) => [
        state.historics,
        state.historicHasLoadingError,
        state.historicsAreLoading,
        state.properties,
        state.chainId
    ]);

    const { t } = useTranslation('historic');
    const { account } = useWeb3React();
    const blockExplorerUrl = CHAINS[chainId as ChainsID].blockExplorerUrl;

    const [downloadLoading, setDownloadLoading] = useState(false);
    const download = () => {
        setDownloadLoading(true);

        const parsedHistorics = historics.map((historic) => {
            const buyerToken = historic.offer.buyerToken;
            const offerToken = historic.offer.offerToken;
        
            const outQuantity = parseFloat(historic.quantity)*parseFloat(historic.price);
            const txhash = historic.purchaseId.split('-')[0];
        
            return {
                purchase_tx: `${blockExplorerUrl}tx/${txhash}`,
                date: moment.unix(parseInt(historic.createdAtTimestamp)).format('DD/MM/YYYY hh:mm:ss'),
                token_bought_name: buyerToken.name,
                token_bought_symbol: buyerToken.symbol,
                token_bought_quantity: parseFloat(historic.quantity),
                sold_token_name: offerToken.name,
                sold_token_symbol: offerToken.symbol,
                sold_token_quantity: outQuantity
            }
        })

        console.log(parsedHistorics);

        saveAs(
            new File(
              [
                stringify(parsedHistorics, { 
                    header: true,
                    columns: [
                        { key: 'purchase_tx', header: 'Purchase tx hash' },
                        { key: 'date', header: 'Purchase date' },
                        { key: 'token_bought_name', header: 'Bought token name' },
                        { key: 'token_bought_symbol', header: 'Bought token symbol' },
                        { key: 'token_bought_quantity', header: 'Bought token quantity' },
                        { key: 'sold_token_name', header: 'Sold token name' },
                        { key: 'sold_token_symbol', header: 'Sold token symbol' },
                        { key: 'sold_token_quantity', header: 'Sold tolen quantity' },
                      ],
                })],
              `purchase-historic-${account}.csv`,
              { type: 'text/csv' }
            )
        );
        setDownloadLoading(false);
    }


    const columns: ColumnDef<Historic,any>[] = useMemo(() => ([
        {
            id: 'purchase-txhash',
            accessorKey: 'purchaseId',
            header: t("table.columnTitle.txHash"),
            cell: ({ getValue }: { getValue: () => string }) => {
                const txhash = getValue().split('-')[0];
                return (
                    <Flex justify={'center'}>
                        <Anchor href={`${blockExplorerUrl}tx/${txhash}`} target="_blank">
                            <Text>{getReduceAddress(txhash)}</Text>
                        </Anchor>
                    </Flex>
                )
            },
            meta: { colSpan: 3 },
        },
        {
            id: 'purchase-date',
            header: t('table.columnTitle.purchaseDate'),
            cell: ({ row }) => (
                <Flex justify={'center'}>
                    <Text>{moment.unix(parseInt(row.original.createdAtTimestamp)).format('DD/MM/YYYY hh:mm:ss')}</Text>
                </Flex>
            ),
            meta: { colSpan: 3 },
        },
        {
            id: 'token-summary',
            header: t('table.columnTitle.tokenSummary'),
            cell: ({ row }) => {
                return(
                    <Flex direction={'column'} gap={4}>
                        <HistoricTokenSummary historic={row.original} />
                    </Flex>
                )
            },
            meta: { colSpan: 10 },
        },
    ]),[t]);

    const data = useMemo(() => {
        return historics ?? [];
    },[historics]);

    const [pagination, setPagination] = useState<PaginationState>({
        pageIndex: 0,
        pageSize: 20,
      });

    const table = useReactTable({
        columns,
        data,
        state: {
            pagination: pagination, 
        },
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onPaginationChange: setPagination,
        meta: { colSpan: 16 }
    });

    if(historicHasLoadingError){
        return(
            <Flex
                h={'100%'}
                w={'100%'}
                justify={'center'}
                align={'center'}
                direction={'column'}
            >
                <IconExclamationCircle size={'200px'} color="#AE740A"/>
                <Text size={'xl'}>{t('errorLoading')}</Text>
            </Flex>
        )
    }

    // TODO: finish this
    if(historicsAreLoading){
        return (
            <></>
        )
    }

    return(
        // <ConnectedProvider>
             <Flex direction={"column"} my={"xl"} h={'100%'}>
                <Flex justify={'space-between'}>
                    <Text fz={'xl'} fw={700} mb={'xl'}>{t('pageTitle')}</Text>
                    <Button 
                        leftSection={<IconDownload/>}
                        loading={downloadLoading}
                        onClick={() => download()}
                    >
                        {t('downloadButton')}
                    </Button>
                </Flex>
                <Table
                    tableProps={{
                        highlightOnHover: true,
                        verticalSpacing: 'sm',
                        horizontalSpacing: 'xs',
                    }}
                    tablecaptionOptions={{ visible: true }}
                    table={table}
                />
             </Flex>
        // </ConnectedProvider>

    )
}