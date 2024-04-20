import { dateFormatter } from '@/shared/utils/dateFormatter'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import GitHubIcon from '@mui/icons-material/GitHub'
import SettingsEthernetIcon from '@mui/icons-material/SettingsEthernet'
import { Box, IconButton, Link, Tooltip, Typography } from '@mui/material'
import { GHRepository } from '../model/types'
import c from './CardRepository.module.css'
import { Language } from '@mui/icons-material'

interface CardRepositoryProps {
  repo: GHRepository
}

export const CardRepository = ({ repo }: CardRepositoryProps) => {
  return (
    <Box className={c.repo}>
      <Box className={c.repoHeader}>
        <Box className={c.repoName}>
          <Link target="_blank" href={repo.html_url} className={c.repoNameLink}>
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

        <Link target="_blank" href={repo.homepage} className={c.homepage}>
          <Language />
          <Typography variant="h6" component="i">
            website
          </Typography>
        </Link>
      </Box>

      <Typography variant="body2">{repo.description}</Typography>

      <Box className={c.repoFooter}>
        <ul className={c.topics}>
          {repo.topics.map(topic => (
            <li key={topic} className={c.topic}>
              <Typography variant="body2" className={c.topicText}>
                {topic}
              </Typography>
            </li>
          ))}
        </ul>
      </Box>
    </Box>
  )
}
