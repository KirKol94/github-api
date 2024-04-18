import { Box, Typography } from '@mui/material'
import { Link, useLocation } from 'react-router-dom'
import { headerLinks } from '../model/data/headerLinks'

export const Header = () => {
  const { pathname } = useLocation()

  return (
    <Box component="header" sx={{ borderBottom: '2px solid black', bgcolor: 'black' }}>
      <Box component="div" sx={{ display: 'flex' }}>
        {headerLinks.map(link => (
          <Link key={link.path} to={link.path}>
            <Box
              sx={{ px: 2, display: 'flex', alignItems: 'center', color: pathname === link.path ? 'primary' : 'white' }}
            >
              {link.Icon && <link.Icon />}
              <Typography variant="body1" sx={{ py: 3, pl: 1 }}>
                {link.name}
              </Typography>
            </Box>
          </Link>
        ))}
      </Box>
    </Box>
  )
}
