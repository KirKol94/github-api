import { subscriptionsDataStore } from '../model/store/subscriptionsDataStore'
import { Loader } from '@/shared/ui/Loader'
import { Avatar, Box, Link, List, ListItem, Typography } from '@mui/material'
import { observer } from 'mobx-react-lite'
import { useEffect } from 'react'

export const SubscriptionsData = observer(({ url }: { url: string }) => {
  const { fetchSubscriptions, subscriptions, error, isLoading } = subscriptionsDataStore

  useEffect(() => {
    fetchSubscriptions(url)
  }, [fetchSubscriptions, url])

  if (isLoading) return <Loader />
  if (error) return <Typography variant="h1">{error}</Typography>
  if (!subscriptions) return <Typography variant="h1">Subscriptions not found</Typography>

  return (
    <Box>
      <Typography variant="h3" component="h2">
        Subscriptions
      </Typography>

      <List>
        {subscriptions.map(sub => (
          <ListItem key={sub.id} sx={{ boxShadow: 1 }}>
            <Link href={sub.html_url} sx={{ color: 'inherit', display: 'flex', alignItems: 'center', width: '100%' }}>
              <Avatar alt={sub.login} src={sub.avatar_url} sx={{ width: 50, height: 50 }} />

              <Typography variant="h6" component="h3" sx={{ ml: 1 }}>
                {sub.login}
              </Typography>
            </Link>
          </ListItem>
        ))}
      </List>
    </Box>
  )
})
