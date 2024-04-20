import { HomeTabs } from '@/widgets/HomeTabs'
import { Profile, profileStore } from '@/entities/Profile'
import { Container } from '@mui/material'
import { observer } from 'mobx-react-lite'
import { ProfileSearch } from '@/features/ProfileSearch'

export const Home = observer(() => {
  const { profile } = profileStore

  return (
    <Container>
      <ProfileSearch />
      <Profile />
      {profile && <HomeTabs />}
    </Container>
  )
})
