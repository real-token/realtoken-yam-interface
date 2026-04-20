import { createFileRoute } from '@tanstack/react-router'
import { Fragment } from 'react'
import { MarketTablePrivate } from 'src/components/Market/MarketTable'

function PrivateOffersPage() {
  return (
    <Fragment>
      <MarketTablePrivate />
    </Fragment>
  )
}

export const Route = createFileRoute('/private-offers')({
  component: PrivateOffersPage,
})
