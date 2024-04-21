import { dateFormatter } from '@/shared/utils/dateFormatter'
import { Language } from '@mui/icons-material'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import GitHubIcon from '@mui/icons-material/GitHub'
import SettingsEthernetIcon from '@mui/icons-material/SettingsEthernet'
import { Avatar, Box, IconButton, Link, Tooltip, Typography } from '@mui/material'
import { GHRepository } from '../model/types'
import c from './CardRepository.module.css'
import { useCardRepository } from './useCardRepository'

interface CardRepositoryProps {
  repo: GHRepository
}

export const CardRepository = ({ repo }: CardRepositoryProps) => {
  const { contributors } = useCardRepository(repo.contributors_url)

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

        {repo.homepage && (
          <Link target="_blank" href={repo.homepage} className={c.homepage}>
            <Language />
            <Typography variant="h6" component="i">
              website
            </Typography>
          </Link>
        )}
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

      {contributors.length > 1 && (
        <Box className={c.contributors}>
          <ul className={c.contributorsList}>
            {contributors.map(contributor => (
              <li key={contributor.login} className={c.contributor}>
                <Tooltip title={contributor.login}>
                  <Link target="_blank" href={contributor.html_url}>
                    <Avatar alt={contributor.login} src={contributor.avatar_url} />
                  </Link>
                </Tooltip>
              </li>
            ))}
          </ul>
        </Box>
      )}
    </Box>
  )
}
