type HeaderLink = {
  name: string
  path: string
}

export const headerLinks: HeaderLink[] = [
  {
    name: 'Home',
    path: '/',
  },
  {
    name: 'Team',
    path: '/team',
  },
  {
    path: '/notFoundPage',
    name: 'Not Found',
  },
]
