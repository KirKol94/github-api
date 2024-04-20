import { Loader } from '@/shared/ui/Loader'
import { dateFormatter } from '@/shared/utils/dateFormatter'
import GitHubIcon from '@mui/icons-material/GitHub'
import { Avatar, Box, Grid, Link, TextField, Tooltip, Typography } from '@mui/material'
import { useProfile } from './useProfile'
import c from './Profile.module.css'

export const Profile = () => {
  const { isLoading, error, profile, login, setLogin, handleSubmit } = useProfile()

  if (isLoading) return <Loader />
  if (error) return <Typography variant="h1">{error}</Typography>
  if (!profile) return <Typography variant="h1">Profile not found</Typography>

  return (
    <Grid container className={c.container}>
      <Grid item xs={12} sm={4} md={2}>
        <Avatar alt={profile?.name} src={profile?.avatar_url} sx={{ width: '100%', height: '100%' }} />
      </Grid>

      <Grid item xs={12} sm={8} md={10} className={c.info}>
        <Tooltip title="Go to GitHub profile">
          <Link href={profile?.html_url} className={c.titleWrapper}>
            <Typography variant="h2" component="h1">
              {profile?.login}
            </Typography>

            <GitHubIcon />
          </Link>
        </Tooltip>

        <form onSubmit={handleSubmit}>
          <TextField
            className={c.input}
            fullWidth
            label="Type here other login"
            variant="filled"
            value={login}
            onChange={e => setLogin(e.target.value)}
            onSubmit={handleSubmit}
          />
        </form>

        <Box className={c.bio}>
          <Typography variant="subtitle2">{profile.bio}</Typography>

          <Typography variant="body1">
            Account created: <b>{dateFormatter(profile.created_at)}</b>
          </Typography>
        </Box>
      </Grid>
    </Grid>
  )
}
