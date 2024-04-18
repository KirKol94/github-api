import { profileDataStore } from '../model/store/profileDataStore'
import { Loader } from '@/shared/ui/Loader'
import { dateFormatter } from '@/shared/utils/dateFormatter'
import GitHubIcon from '@mui/icons-material/GitHub'
import { Avatar, Box, Link, Typography } from '@mui/material'

export const ProfileData = () => {
  const { profile, error, isLoading } = profileDataStore

  if (isLoading) return <Loader />
  if (error) return <Typography variant="h1">{error}</Typography>
  if (!profile) return <Typography variant="h1">Profile not found</Typography>

  return (
    <Box sx={{ py: 2, display: 'flex', gap: 2, alignItems: 'center', borderBottom: '2px solid black' }}>
      <Avatar alt={profile?.name} src={profile?.avatar_url} sx={{ width: 150, height: 150 }} />
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        <Link href={profile?.html_url} sx={{ color: 'inherit' }}>
          <Typography variant="h1" component="h1">
            {profile?.login}
          </Typography>
        </Link>

        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          <Link href={profile.html_url}>
            <GitHubIcon sx={{ color: 'black' }} />
          </Link>

          <Typography variant="subtitle2" component="i">
            {profile.bio}
          </Typography>
        </Box>

        <Typography variant="body1" component="span">
          Account created: <b>{dateFormatter(profile.created_at)}</b>
        </Typography>
      </Box>
    </Box>
  )
}
