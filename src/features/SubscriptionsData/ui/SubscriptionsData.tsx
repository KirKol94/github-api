import { CardSubscribe } from '@/entities/CardSubscribe'
import { Loader } from '@/shared/ui/Loader'
import { List, ListItem, Typography } from '@mui/material'
import { observer } from 'mobx-react-lite'
import { useEffect } from 'react'
import { subscriptionsDataStore } from '../model/store/subscriptionsDataStore'
import c from './Subscriptions.module.css'

export const SubscriptionsData = observer(({ url }: { url: string }) => {
  const { fetchSubscriptions, subscriptions, error, isLoading } = subscriptionsDataStore

  useEffect(() => {
    fetchSubscriptions(url)
  }, [fetchSubscriptions, url])

  if (isLoading) return <Loader />
  if (error) return <Typography variant="h1">{error}</Typography>
  if (subscriptions.length === 0) return <Typography variant="h1">Subscriptions list is empty</Typography>

  return (
    <List className={c.list}>
      {subscriptions.map(sub => (
        <ListItem key={sub.id} className={c.listItem}>
          <CardSubscribe sub={sub} />
        </ListItem>
      ))}
    </List>
  )
})
