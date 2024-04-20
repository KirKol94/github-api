import { Loader } from '@/shared/ui/Loader'
import { dateFormatter } from '@/shared/utils/dateFormatter'
import GitHubIcon from '@mui/icons-material/GitHub'
import { Avatar, Box, Grid, Link, Tooltip, Typography } from '@mui/material'
import c from './Profile.module.css'
import { useProfile } from './useProfile'

export const Profile = () => {
  const { isLoading, error, profile } = useProfile()

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
