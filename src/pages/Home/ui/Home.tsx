import { Tabs } from '@/shared/ui/Tabs'
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
      {profile && (
        <Tabs
          headers={['Repositories', 'Following']}
          children={[<RepoList url={profile?.repos_url} />, <SubscriptionsData url={profile?.following_url} />]}
        />
      )}
    </Container>
  )
})
