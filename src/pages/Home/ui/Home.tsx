import { Profile, profileStore } from '@/entities/Profile'
import { ProfileSearch } from '@/features/ProfileSearch'
import { Loader } from '@/shared/ui/Loader'
import { HomeTabs } from '@/widgets/HomeTabs'
import { Container, Typography } from '@mui/material'
import { observer } from 'mobx-react-lite'
import { useEffect } from 'react'

export const Home = observer(() => {
  const { fetchProfile, profile, error, isLoading } = profileStore

  useEffect(() => {
    fetchProfile('https://api.github.com/users/kirkol94')
  }, [fetchProfile])

  return (
    <Container>
      <ProfileSearch />
      {isLoading && <Loader />}
      {error && <Typography variant="h4">{error}</Typography>}
      {profile && <Profile profile={profile} />}
      {profile && <HomeTabs profile={profile} />}
    </Container>
  )
})
