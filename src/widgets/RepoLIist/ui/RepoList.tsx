import { reposDataStore } from '@/features/ReposData'
import { Loader } from '@/shared/ui/Loader'
import { dateFormatter } from '@/shared/utils/dateFormatter'
import GitHubIcon from '@mui/icons-material/GitHub'
import SettingsEthernetIcon from '@mui/icons-material/SettingsEthernet'
import { Box, IconButton, Link, List, ListItem, Tooltip, Typography } from '@mui/material'
import { observer } from 'mobx-react-lite'
import { useEffect } from 'react'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'

export const RepoList = observer(({ url }: { url: string }) => {
  const { fetchRepositories, error, isLoading, repositories } = reposDataStore

  useEffect(() => {
    fetchRepositories(url)
  }, [fetchRepositories, url])

  if (error) return <Typography variant="h1">{error}</Typography>
  if (isLoading) return <Loader />

  return (
    <Box sx={{ py: 2 }}>
      <Typography variant="h2">Repos</Typography>

      <List>
        {repositories.map(repo => (
          <ListItem key={repo.id} sx={{ pl: 0, alignItems: 'baseLine' }}>
            <GitHubIcon />
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Link href={repo.html_url} sx={{ color: 'inherit' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Typography variant="h6" component="h3" sx={{ ml: 1 }}>
                    {repo.name}
                  </Typography>
                  <SettingsEthernetIcon />
                  <Typography variant="h6" component="i" sx={{ ml: 1 }}>
                    {repo.language}
                  </Typography>
                </Box>
              </Link>

              <Typography variant="body1">createdAt: {dateFormatter(repo.created_at)}</Typography>

              <Typography variant="subtitle2" sx={{ ml: 1 }}>
                {repo.description}
              </Typography>

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Link href={repo.clone_url}>
                  <Typography variant="subtitle2" sx={{ ml: 1 }}>
                    {repo.clone_url}
                  </Typography>
                </Link>
                <Tooltip title="Copy to clipboard">
                  <IconButton onClick={() => navigator.clipboard.writeText(repo.clone_url)}>
                    <ContentCopyIcon />
                  </IconButton>
                </Tooltip>
              </Box>
            </Box>
          </ListItem>
        ))}
      </List>
    </Box>
  )
})
