import { createFileRoute } from '@tanstack/react-router'
import { MarketTablePrivate } from 'src/components/Market/MarketTable'
import { ConnectedProvider } from 'src/providers/ConnectProvider'

function PrivateOffersPage() {
  return (
    <ConnectedProvider>
      <MarketTablePrivate />
    </ConnectedProvider>
  )
}

export const Route = createFileRoute('/private-offers')({
  component: PrivateOffersPage,
})
