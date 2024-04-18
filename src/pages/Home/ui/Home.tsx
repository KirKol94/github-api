import { Tabs } from '@/shared/ui/Tabs'
import { ProfileData, profileDataStore } from '@/widgets/ProfileData'
import { RepoList } from '@/widgets/RepoLIist'
import { SubscriptionsData } from '@/widgets/SubscriptionsData'
import { Container } from '@mui/material'
import { observer } from 'mobx-react-lite'

export const Home = observer(() => {
  const { profile } = profileDataStore

  return (
    <Container>
      <ProfileData />
      {profile && (
        <Tabs
          headers={['Repositories', 'Subscriptions']}
          children={[<RepoList url={profile.repos_url} />, <SubscriptionsData url={profile.following_url} />]}
        />
      )}
    </Container>
  )
})
