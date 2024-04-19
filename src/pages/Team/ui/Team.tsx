import { MyTeam } from '@/widgets/MyTeam'
import { UserList } from '@/widgets/UserList'
import { userListDataStore } from '@/widgets/UserList/model/store/userListDataStore'
import { Box, Container, Typography } from '@mui/material'
import { observer } from 'mobx-react-lite'
import { useEffect } from 'react'
import c from './Team.module.css'
import { Loader } from '@/shared/ui/Loader'

export const Team = observer(() => {
  const { fetchUsers, users, error, isLoading } = userListDataStore

  useEffect(() => {
    fetchUsers('https://api.github.com/users?since=50000000')
  }, [fetchUsers])

  if (isLoading) return <Loader />
  if (error) return <Typography variant="h1">{error}</Typography>
  if (!users) return <Typography variant="h1">Users not found</Typography>

  return (
    <Container>
      <Box className={c.container}>
        <MyTeam />
        <UserList />
      </Box>
    </Container>
  )
})
