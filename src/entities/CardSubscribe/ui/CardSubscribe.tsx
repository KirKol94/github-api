import { Avatar, Box, Typography } from '@mui/material'
import { GHSubscribe } from '../model/types'
import c from './CardSubscribe.module.css'

interface CardSubscribeProps {
  sub: GHSubscribe
  onClick: () => void
}

export const CardSubscribe = ({ sub, onClick }: CardSubscribeProps) => {
  return (
    <button className={c.item} onClick={onClick}>
      <Box className={c.itemHeader}>
        <Avatar alt={sub.login} src={sub.avatar_url} />

        <Typography variant="h6" component="h3">
          {sub.login}
        </Typography>
      </Box>
    </button>
  )
}
