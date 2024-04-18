import { MyTeam } from '@/widgets/MyTeam'
import { UserList } from '@/widgets/UserList'
import { Container, Grid, Typography } from '@mui/material'

export const Team = () => {
  return (
    <Container>
      <Typography variant="h1">Team</Typography>

      <Grid container gridColumn={2}>
        <MyTeam />
        <UserList />
      </Grid>
    </Container>
  )
}
