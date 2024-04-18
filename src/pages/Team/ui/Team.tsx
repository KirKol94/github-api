import { MyTeam } from '@/widgets/MyTeam'
import { UserList } from '@/widgets/UserList'
import { Box, Container, Typography } from '@mui/material'

export const Team = () => {
  return (
    <Container>
      <Typography variant="h1">Team</Typography>

      <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
        <MyTeam />
        <UserList />
      </Box>
    </Container>
  )
}
