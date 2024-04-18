import { myTeamStore } from '@/features/MyTeam'
import { Avatar, Box, IconButton, Link, List, ListItem, Tooltip, Typography } from '@mui/material'
import { observer } from 'mobx-react-lite'
import PersonRemoveIcon from '@mui/icons-material/PersonRemove'

export const MyTeam = observer(() => {
  const { myTeammates, removeTeammate } = myTeamStore

  return (
    <Box>
      <Typography variant="h2">My Team</Typography>
      <List>
        {myTeammates.map(teammate => (
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
