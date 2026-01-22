import { createFileRoute } from '@tanstack/react-router'

import { Flex } from '@mantine/core'
import { useWeb3AuthPrivate } from '@real-token/web3'

import Display from 'src/components/Display/Display'
import 'src/components/Market'
import { MarketTableFilter } from 'src/components/Market/Filters'
import { ConnectedProvider } from 'src/providers/ConnectProvider'

function HomePage() {
  const web3Auth = useWeb3AuthPrivate()
  console.dir(web3Auth, { depth: 10 })

  return (
    <ConnectedProvider>
      <Flex my={'xl'} direction={'column'}>
        <MarketTableFilter />
        <Display />
      </Flex>
    </ConnectedProvider>
  )
}

export const Route = createFileRoute('/')({
  component: HomePage,
})
