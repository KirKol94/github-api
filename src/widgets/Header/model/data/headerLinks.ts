import GroupIcon from '@mui/icons-material/Group'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'

type HeaderLink = {
  name: string
  path: string
  Icon?: typeof GroupIcon
}

export const headerLinks: HeaderLink[] = [
  {
    name: 'Home',
    path: '/',
    Icon: AccountCircleIcon,
  },
  {
    name: 'Team',
    path: '/team',
    Icon: GroupIcon,
  },
  {
    path: '/notFoundPage',
    name: 'Not Found',
  },
]
