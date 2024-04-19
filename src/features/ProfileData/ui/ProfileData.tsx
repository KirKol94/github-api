import { Loader } from '@/shared/ui/Loader'
import { dateFormatter } from '@/shared/utils/dateFormatter'
import GitHubIcon from '@mui/icons-material/GitHub'
import { Avatar, Box, Grid, Link, TextField, Tooltip, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { profileDataStore } from '../model/store/profileDataStore'

export const ProfileData = () => {
  const { fetchProfile, profile, error, isLoading } = profileDataStore
  const [login, setLogin] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    fetchProfile('https://api.github.com/users/' + login)
  }

  useEffect(() => {
    fetchProfile('https://api.github.com/users/kirkol94')
  }, [fetchProfile])

  if (isLoading) return <Loader />
  if (error) return <Typography variant="h1">{error}</Typography>
  if (!profile) return <Typography variant="h1">Profile not found</Typography>

  return (
    <Grid container alignItems="center" sx={{ py: 3 }}>
      <Grid item xs={12} sm={6} md={3}>
        <Avatar alt={profile?.name} src={profile?.avatar_url} sx={{ width: '100%', height: '100%' }} />
      </Grid>

      <Grid item xs={12} sm={6} md={9} sx={{ pl: 2 }}>
        <Tooltip title="Go to GitHub profile">
          <Link href={profile?.html_url} sx={{ display: 'flex', alignItems: 'center', gap: 2, width: 'fit-content' }}>
            <Typography variant="h2" component="h1">
              {profile?.login}
            </Typography>

            <GitHubIcon />
          </Link>
        </Tooltip>

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="github login"
            variant="standard"
            value={login}
            onChange={e => setLogin(e.target.value)}
            onSubmit={handleSubmit}
          />
        </form>

        <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 1 }}>
          <Typography variant="subtitle2" component="code">
            {profile.bio}
          </Typography>

          <Typography variant="body1">
            Account created: <b>{dateFormatter(profile.created_at)}</b>
          </Typography>
        </Box>
      </Grid>
    </Grid>
  )
}
