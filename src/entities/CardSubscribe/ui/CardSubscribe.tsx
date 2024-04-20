import { Avatar, Box, Link, Typography } from '@mui/material'
import { GHSubscribe } from '../model/types'
import c from './CardSubscribe.module.css'

interface CardSubscribeProps {
  sub: GHSubscribe
}

export const CardSubscribe = ({ sub }: CardSubscribeProps) => {
  return (
    <Box className={c.item}>
      <Link
        target="_blank"
        href={sub.html_url}
        sx={{ color: 'inherit', display: 'flex', alignItems: 'center', width: '100%' }}
      >
        <Box className={c.itemHeader}>
          <Avatar alt={sub.login} src={sub.avatar_url} />

          <Typography variant="h6" component="h3">
            {sub.login}
          </Typography>
        </Box>
      </Link>
    </Box>
  )
}
