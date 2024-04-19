import { Loader } from '@/shared/ui/Loader'
import { dateFormatter } from '@/shared/utils/dateFormatter'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import GitHubIcon from '@mui/icons-material/GitHub'
import SettingsEthernetIcon from '@mui/icons-material/SettingsEthernet'
import { Box, Grid, IconButton, Link, List, ListItem, Tooltip, Typography } from '@mui/material'
import { observer } from 'mobx-react-lite'
import { useEffect } from 'react'
import { reposDataStore } from '../model/store/reposDataStore'
import c from './RepoList.module.css'

export const RepoList = observer(({ url }: { url: string }) => {
  const { fetchRepositories, error, isLoading, repositories } = reposDataStore

  useEffect(() => {
    fetchRepositories(url)
  }, [fetchRepositories, url])

  if (isLoading) return <Loader />
  if (error) return <Typography variant="h1">{error}</Typography>
  if (repositories.length === 0) return <Typography variant="h1">Repositories list is empty</Typography>

  return (
    <Box>
      <List className={c.list}>
        {Array.isArray(repositories) &&
          repositories.map(repo => (
            <ListItem key={repo.id} className={c.listItem}>
              <Box className={c.repoHeader}>
                <Box className={c.repoName}>
                  <Link href={repo.html_url} className={c.repoNameLink}>
                    <GitHubIcon />
                    <Typography variant="h6" component="h3">
                      {repo.name}
                    </Typography>
                  </Link>

                  <Tooltip title="Copy to clipboard">
                    <IconButton
                      onClick={() => navigator.clipboard.writeText('git clone ' + repo?.clone_url)}
                      className={c.copyIcon}
                    >
                      <ContentCopyIcon />
                    </IconButton>
                  </Tooltip>
                </Box>

                <Box className={c.languageAndData}>
                  <Box className={c.language}>
                    <SettingsEthernetIcon />
                    <Typography variant="h6" component="i">
                      {repo.language}
                    </Typography>
                  </Box>

                  <Typography variant="body1">{dateFormatter(repo.created_at)}</Typography>
                </Box>
              </Box>

              <Typography variant="body2">{repo.description}</Typography>
            </ListItem>
          ))}
      </List>
    </Box>
  )
})
