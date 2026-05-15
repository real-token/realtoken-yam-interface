import { createFileRoute } from '@tanstack/react-router'

import { Flex } from '@mantine/core'

import Display from 'src/components/Display/Display'
import 'src/components/Market'
import { MarketTableFilter } from 'src/components/Market/Filters'
import { ConnectedProvider } from 'src/providers/ConnectProvider'

function HomePage() {
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
