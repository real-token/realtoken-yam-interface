import { createFileRoute } from '@tanstack/react-router'
import { Flex, Tabs } from '@mantine/core'
import { IconClick, IconList } from '@tabler/icons-react'
import { useTranslation } from 'react-i18next'
import { AdminActions } from 'src/components/Admin/AdminActions'
import { MarketTableAdmin } from 'src/components/Market/MarketTable/MarketTableAdmin'
import { ConnectedProvider } from 'src/providers/ConnectProvider'

function AdminPage() {
  const { t } = useTranslation('menu', { keyPrefix: 'subMenuAdmin' })

  return (
    <ConnectedProvider>
      <Flex direction={'column'} py={'xl'} style={{ flexGrow: 1 }}>
        <Tabs
          color={'brand'}
          variant={'pills'}
          defaultValue={'adminMarketTable'}
        >
          <Tabs.List>
            <Tabs.Tab
              value={'adminMarketTable'}
              rightSection={<IconList size={18} />}
            >
              {t('adminMarketTable')}
            </Tabs.Tab>
            <Tabs.Tab
              value={'adminActions'}
              rightSection={<IconClick size={18} />}
            >
              {t('adminActions')}
            </Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value={'adminMarketTable'} pt={'xs'}>
            <MarketTableAdmin />
          </Tabs.Panel>

          <Tabs.Panel value={'adminActions'} pt={'xs'}>
            <AdminActions />
          </Tabs.Panel>
        </Tabs>
      </Flex>
    </ConnectedProvider>
  )
}

export const Route = createFileRoute('/admin')({
  component: AdminPage,
})
