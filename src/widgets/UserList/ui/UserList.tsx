import ControlPointIcon from '@mui/icons-material/ControlPoint'
import { Avatar, Box, IconButton, Link, List, ListItem, TextField, Tooltip, Typography } from '@mui/material'
import { observer } from 'mobx-react-lite'
import c from './UserList.module.css'
import { useUserList } from './useUserList'

export const UserList = observer(() => {
  const { users, addTeammate, myTeammates, filterList, searchValue } = useUserList()

  return (
    <Box className={c.container}>
      <Box className={c.header}>
        <Typography variant="h3" component="h2">
          Users
        </Typography>

        <TextField label="Search" variant="filled" onChange={filterList} value={searchValue} className={c.input} />
      </Box>
      <List>
        {users
          .filter(user => user.login.toLowerCase().includes(searchValue.toLowerCase()))
          .filter(user => !myTeammates.find(item => item.id === user.id))
          .map(user => (
            <ListItem key={user.id} className={c.listItem}>
              <Link href={user.html_url} className={c.link}>
                <Avatar alt={user.login} src={user.avatar_url} sx={{ width: 50, height: 50 }} />

                <Typography variant="h6" component="h3">
                  {user.login}
                </Typography>
              </Link>

              <Tooltip title="Add user to team">
                <IconButton onClick={() => addTeammate(user)} className={c.addIcon}>
                  <ControlPointIcon />
                </IconButton>
              </Tooltip>
            </ListItem>
          ))}
      </List>
    </Box>
  )
})
