import { HomeTabs } from '@/widgets/HomeTabs'
import { ProfileData, profileDataStore } from '@/features/ProfileData'
import { Container } from '@mui/material'
import { observer } from 'mobx-react-lite'

export const Home = observer(() => {
  const { profile } = profileDataStore

  return (
    <Container>
      <ProfileData />
      {profile && <HomeTabs />}
    </Container>
  )
})
