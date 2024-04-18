import { myTeamStore } from '@/features/MyTeam'
import PersonRemoveIcon from '@mui/icons-material/PersonRemove'
import SortByAlphaIcon from '@mui/icons-material/SortByAlpha'
import { Avatar, Box, IconButton, Link, List, ListItem, Tooltip, Typography } from '@mui/material'
import { observer } from 'mobx-react-lite'
import { useState } from 'react'

export const MyTeam = observer(() => {
  const { myTeammates, removeTeammate } = myTeamStore
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc') // Состояние для хранения порядка сортировки

  const handleSortClick = () => {
    setSortOrder(prev => (prev === 'asc' ? 'desc' : 'asc'))
  }

  const sortedUsers = myTeammates ? [...myTeammates] : [] // Копируем массив пользователей

  sortedUsers.sort((a, b) => {
    if (sortOrder === 'asc') {
      return a.login.localeCompare(b.login)
    } else {
      return b.login.localeCompare(a.login)
    }
  })

  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', borderBottom: '2px solid black' }}>
        <Typography variant="h2">My Team</Typography>
        <Tooltip title="Change sort order">
          <IconButton onClick={handleSortClick}>
            <SortByAlphaIcon />
          </IconButton>
        </Tooltip>
      </Box>

      <List>
        {sortedUsers.map(teammate => (
          <ListItem key={teammate.id} sx={{ pl: 0, display: 'flex', justifyContent: 'space-between' }}>
            <Link href={teammate.html_url} sx={{ color: 'inherit', display: 'flex', alignItems: 'center' }}>
              <Avatar alt={teammate.login} src={teammate.avatar_url} sx={{ width: 50, height: 50 }} />
              <Typography variant="h6" component="h3" sx={{ ml: 1 }}>
                {teammate.login}
              </Typography>
            </Link>

            <Tooltip title="Remove user from team">
              <IconButton sx={{ ml: 1 }} onClick={() => removeTeammate(teammate.id)}>
                <PersonRemoveIcon />
              </IconButton>
            </Tooltip>
          </ListItem>
        ))}
      </List>
    </Box>
  )
})
