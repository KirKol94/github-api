import { CardSubscribe } from '@/entities/CardSubscribe'
import { Loader } from '@/shared/ui/Loader'
import { List, ListItem, Typography } from '@mui/material'
import { observer } from 'mobx-react-lite'
import { useEffect } from 'react'
import { subscriptionsDataStore } from '../model/store/subscriptionsDataStore'
import c from './Subscriptions.module.css'
import { profileStore } from '@/entities/Profile'

export const SubscriptionsData = observer(({ url }: { url: string }) => {
  const { fetchSubscriptions, subscriptions, error, isLoading } = subscriptionsDataStore
  const { fetchProfile } = profileStore

  const selectProfile = (url: string) => {
    fetchProfile(url)
  }

  useEffect(() => {
    fetchSubscriptions(url)
  }, [fetchSubscriptions, url])

  if (isLoading) return <Loader />
  if (error) return <Typography variant="h4">{error}</Typography>
  if (subscriptions.length === 0) return <Typography variant="h4">Subscriptions list is empty</Typography>

  return (
    <List className={c.list}>
      {subscriptions.map(sub => (
        <ListItem key={sub.id} className={c.listItem}>
          <CardSubscribe sub={sub} onClick={() => selectProfile(sub.url)} />
        </ListItem>
      ))}
    </List>
  )
})
