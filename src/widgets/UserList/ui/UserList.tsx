import { Loader } from '@/shared/ui/Loader'
import { Avatar, Box, IconButton, Link, List, ListItem, TextField, Tooltip, Typography } from '@mui/material'
import { observer } from 'mobx-react-lite'
import { useEffect, useState } from 'react'
import { userListDataStore } from '../model/store/userListDataStore'
import ControlPointIcon from '@mui/icons-material/ControlPoint'
import { myTeamStore } from '@/features/MyTeam'

export const UserList = observer(() => {
  const { fetchUsers, users, error, isLoading } = userListDataStore
  const { addTeammate, myTeammates } = myTeamStore
  const [searchValue, setSearchValue] = useState('')

  const filterList = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchValue(value)
  }

  useEffect(() => {
    fetchUsers('https://api.github.com/users?since=50000000')
  }, [fetchUsers])

  if (isLoading) return <Loader />
  if (error) return <Typography variant="h1">{error}</Typography>
  if (!users) return <Typography variant="h1">Users not found</Typography>

  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '2px solid black',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            borderBottom: '2px solid black',
          }}
        >
          <Typography variant="h2">Users</Typography>
        </Box>

        <TextField label="Search" variant="outlined" type="search" onChange={filterList} value={searchValue} />
      </Box>

      <List>
        {users
          .filter(user => user.login.toLowerCase().includes(searchValue.toLowerCase()))
          .map(user => (
            <ListItem key={user.id} sx={{ px: 0, display: 'flex', justifyContent: 'space-between' }}>
              <Link href={user.html_url} sx={{ color: 'inherit', display: 'flex', alignItems: 'center' }}>
                <Avatar alt={user.login} src={user.avatar_url} sx={{ width: 50, height: 50 }} />

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Typography variant="h6" component="h3" sx={{ ml: 1 }}>
                    {user.login}
                  </Typography>
                </Box>
              </Link>

              {myTeammates.find(teammate => teammate.id === user.id) ? null : (
                <Tooltip title="Add user to team">
                  <IconButton onClick={() => addTeammate(user)}>
                    <ControlPointIcon />
                  </IconButton>
                </Tooltip>
              )}
            </ListItem>
          ))}
      </List>
    </Box>
  )
})
