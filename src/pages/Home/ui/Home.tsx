import { HomeTabs } from '@/widgets/HomeTabs'
import { Profile, profileStore } from '@/entities/Profile'
import { Container } from '@mui/material'
import { observer } from 'mobx-react-lite'

export const Home = observer(() => {
  const { profile } = profileStore

  return (
    <Container>
      <Profile />
      {profile && <HomeTabs />}
    </Container>
  )
})
