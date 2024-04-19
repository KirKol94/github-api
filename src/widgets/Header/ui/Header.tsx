import { Box, Typography } from '@mui/material'
import { NavLink } from 'react-router-dom'
import { headerLinks } from '../model/data/headerLinks'
import c from './Header.module.css'

export const Header = () => {
  return (
    <Box component="header" className={c.header}>
      <Box className={c.container}>
        {headerLinks.map(link => (
          <NavLink
            key={link.path}
            to={link.path}
            className={({ isActive }) => (isActive ? `${c.link} ${c.isActive}` : c.link)}
          >
            {link.Icon && <link.Icon />}
            <Typography variant="body1" className={c.linkText}>
              {link.name}
            </Typography>
          </NavLink>
        ))}
      </Box>
    </Box>
  )
}
