import { CardRepository } from '@/entities/CardRepository'
import { Loader } from '@/shared/ui/Loader'
import { Box, List, ListItem, Typography } from '@mui/material'
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
            <ListItem key={repo.id}>
              <CardRepository repo={repo} />
            </ListItem>
          ))}
      </List>
    </Box>
  )
})
