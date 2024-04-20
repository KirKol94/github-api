import { subscriptionsDataStore } from '../model/store/subscriptionsDataStore'
import { Loader } from '@/shared/ui/Loader'
import { Avatar, Box, Link, List, ListItem, Typography } from '@mui/material'
import { observer } from 'mobx-react-lite'
import { useEffect } from 'react'
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
          <Link href={sub.html_url} sx={{ color: 'inherit', display: 'flex', alignItems: 'center', width: '100%' }}>
            <Box className={c.itemHeader}>
              <Avatar alt={sub.login} src={sub.avatar_url} sx={{ width: 50, height: 50 }} />

              <Typography variant="h6" component="h3" sx={{ ml: 1 }}>
                {sub.login}
              </Typography>
            </Box>
          </Link>
        </ListItem>
      ))}
    </List>
  )
})
