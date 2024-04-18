import { Loader } from '@/shared/ui/Loader'
import SortByAlphaIcon from '@mui/icons-material/SortByAlpha'
import { Avatar, Box, IconButton, Link, List, ListItem, TextField, Tooltip, Typography } from '@mui/material'
import { observer } from 'mobx-react-lite'
import { useEffect, useState } from 'react'
import { userListDataStore } from '../model/store/userListDataStore'
import ControlPointIcon from '@mui/icons-material/ControlPoint'

export const UserList = observer(() => {
  const { fetchUsers, users, error, isLoading } = userListDataStore
  const [searchValue, setSearchValue] = useState('')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc') // Состояние для хранения порядка сортировки

  const filterSortedList = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchValue(value)
  }

  useEffect(() => {
    fetchUsers('https://api.github.com/users?since=50000000')
  }, [fetchUsers])

  const handleSortClick = () => {
    // Изменяем состояние порядка сортировки при клике на кнопку
    setSortOrder(prevOrder => (prevOrder === 'asc' ? 'desc' : 'asc'))
  }

  const sortedUsers = users ? [...users] : [] // Копируем массив пользователей

  // Сортировка пользователей по алфавиту в соответствии с текущим порядком сортировки
  sortedUsers.sort((a, b) => {
    if (sortOrder === 'asc') {
      return a.login.localeCompare(b.login)
    } else {
      return b.login.localeCompare(a.login)
    }
  })

  if (isLoading) return <Loader />
  if (error) return <Typography variant="h1">{error}</Typography>
  if (!users) return <Typography variant="h1">Users not found</Typography>

  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '2px solid black',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            borderBottom: '2px solid black',
          }}
        >
          <Typography variant="h2">Users</Typography>
          <Tooltip title="Change sort order">
            <IconButton onClick={handleSortClick}>
              {' '}
              {/* Добавляем обработчик клика */}
              <SortByAlphaIcon />
            </IconButton>
          </Tooltip>
        </Box>

        <TextField label="Search" variant="outlined" type="search" onChange={filterSortedList} value={searchValue} />
      </Box>

      <List>
        {sortedUsers
          .filter(user => user.login.toLowerCase().includes(searchValue.toLowerCase()))
          .map(user => (
            <ListItem key={user.id} sx={{ pl: 0 }}>
              <Link href={user.html_url} sx={{ color: 'inherit', display: 'flex', alignItems: 'center' }}>
                <Avatar alt={user.login} src={user.avatar_url} sx={{ width: 50, height: 50 }} />

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Typography variant="h6" component="h3" sx={{ ml: 1 }}>
                    {user.login}
                  </Typography>
                </Box>
              </Link>
              <Tooltip title="Add user to team">
                {/* TODO Add user to team */}
                <IconButton onClick={() => {}}>
                  <ControlPointIcon />
                </IconButton>
              </Tooltip>
            </ListItem>
          ))}
      </List>
    </Box>
  )
})
