import { GHProfile } from '@/entities/Profile/model/types'
import { RepoList } from '@/features/RepoLIist'
import { SubscriptionsData } from '@/features/SubscriptionsData'
import Box from '@mui/material/Box'
import Tab from '@mui/material/Tab'
import Tabs from '@mui/material/Tabs'
import { observer } from 'mobx-react-lite'
import * as React from 'react'
import c from './HomeTabs.module.css'

interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <>{children}</>}
    </div>
  )
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  }
}
interface Props {
  profile: GHProfile | null
}

export const HomeTabs = observer(({ profile }: Props) => {
  const [value, setValue] = React.useState(0)

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    event.preventDefault()
    setValue(newValue)
  }

  if (!profile) {
    return null
  }

  return (
    <Box className={c.container}>
      <Box className={c.tabs}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Repositories" {...a11yProps(0)} />
          <Tab label="Subscriptions" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <RepoList url={profile.repos_url} />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <SubscriptionsData url={profile.following_url} />
      </CustomTabPanel>
    </Box>
  )
})
