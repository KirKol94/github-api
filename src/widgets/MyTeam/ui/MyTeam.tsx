import PersonRemoveIcon from '@mui/icons-material/PersonRemove'
import SortByAlphaIcon from '@mui/icons-material/SortByAlpha'
import { Avatar, Box, IconButton, Link, List, ListItem, Tooltip, Typography } from '@mui/material'
import { observer } from 'mobx-react-lite'
import c from './MyTeam.module.css'
import { useMyTeam } from './useMyTeam'

export const MyTeam = observer(() => {
  const { removeTeammate, sortedUsers, handleSortClick } = useMyTeam()

  return (
    <Box className={c.container}>
      <Box className={c.header}>
        <Typography variant="h3" component="h2">
          My Team
        </Typography>

        <Tooltip title="Change sort order">
          <IconButton onClick={handleSortClick} className={c.sortIcon}>
            <SortByAlphaIcon />
          </IconButton>
        </Tooltip>
      </Box>

      <List>
        {sortedUsers.map(teammate => (
          <ListItem key={teammate.id} className={c.listItem}>
            <Link href={teammate.html_url} className={c.link}>
              <Avatar alt={teammate.login} src={teammate.avatar_url} sx={{ width: 50, height: 50 }} />
              <Typography variant="h6" component="h3">
                {teammate.login}
              </Typography>
            </Link>

            <Tooltip title="Remove user from team">
              <IconButton sx={{ ml: 1 }} onClick={() => removeTeammate(teammate.id)} className={c.removeIcon}>
                <PersonRemoveIcon />
              </IconButton>
            </Tooltip>
          </ListItem>
        ))}
      </List>
    </Box>
  )
})
