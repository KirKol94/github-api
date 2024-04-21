import { Profile, profileStore } from '@/entities/Profile'
import { ProfileSearch } from '@/features/ProfileSearch'
import { HomeTabs } from '@/widgets/HomeTabs'
import { Container } from '@mui/material'
import { observer } from 'mobx-react-lite'

export const Home = observer(() => {
  const { profile } = profileStore

  return (
    <Container>
      <ProfileSearch />
      {profile && <Profile profile={profile} />}
      {profile && <HomeTabs profile={profile} />}
    </Container>
  )
})
