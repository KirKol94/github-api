import { Loader } from '@/shared/ui/Loader'
import { dateFormatter } from '@/shared/utils/dateFormatter'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import GitHubIcon from '@mui/icons-material/GitHub'
import SettingsEthernetIcon from '@mui/icons-material/SettingsEthernet'
import { Box, Grid, IconButton, Link, List, ListItem, Tooltip, Typography } from '@mui/material'
import { observer } from 'mobx-react-lite'
import { useEffect } from 'react'
import { reposDataStore } from '../model/store/reposDataStore'

export const RepoList = observer(({ url }: { url: string }) => {
  const { fetchRepositories, error, isLoading, repositories } = reposDataStore

  useEffect(() => {
    fetchRepositories(url)
  }, [fetchRepositories, url])

  if (isLoading) return <Loader />
  if (error) return <Typography variant="h1">{error}</Typography>
  if (!repositories) return <Typography variant="h1">Repositories not found</Typography>

  return (
    <Box>
      <Typography variant="h2">Repos</Typography>

      <List>
        {repositories.map(repo => (
          <ListItem
            key={repo.id}
            sx={{ px: 0, overflowX: 'auto', display: 'flex', flexDirection: 'column', justifyContent: 'start' }}
          >
            <Grid container alignContent="center" alignItems="center">
              <Grid item xs={12} sm={6} md={4}>
                <Link href={repo.html_url} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <GitHubIcon />
                  <Typography variant="h6" component="h3">
                    {repo.name}
                  </Typography>
                </Link>
              </Grid>

              <Grid item xs={12} sm={6} md={4} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <SettingsEthernetIcon />
                <Typography variant="h6" component="i">
                  {repo.language}
                </Typography>
              </Grid>

              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
              >
                <Link href={repo.clone_url} sx={{ maxWidth: '100%', overflow: 'hidden' }}>
                  <Typography variant="subtitle2">{repo.clone_url}</Typography>
                </Link>

                <Tooltip title="Copy to clipboard">
                  <IconButton onClick={() => navigator.clipboard.writeText(repo?.clone_url)}>
                    <ContentCopyIcon />
                  </IconButton>
                </Tooltip>
              </Grid>
            </Grid>

            <Typography variant="body1">createdAt: {dateFormatter(repo.created_at)}</Typography>

            <Typography variant="body2">{repo.description}</Typography>
          </ListItem>
        ))}
      </List>
    </Box>
  )
})
