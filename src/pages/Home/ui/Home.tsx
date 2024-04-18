import { ProfileData, profileDataStore } from '@/widgets/ProfileData'
import { RepoList } from '@/widgets/RepoLIist'
import { SubscriptionsData } from '@/widgets/SubscriptionsData'
import { Container } from '@mui/material'
import { observer } from 'mobx-react-lite'
import { useEffect } from 'react'

export const Home = observer(() => {
  const { fetchProfile, profile } = profileDataStore

  useEffect(() => {
    fetchProfile()
  }, [fetchProfile])

  return (
    <Container>
      <ProfileData />
      {profile && <RepoList url={profile.repos_url} />}
      {profile && <SubscriptionsData url={profile.following_url} />}
    </Container>
  )
})
