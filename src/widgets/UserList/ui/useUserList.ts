import { myTeamStore } from '@/features/MyTeam'
import { useState } from 'react'
import { userListDataStore } from '../model/store/userListDataStore'

export const useUserList = () => {
  const { users } = userListDataStore
  const { addTeammate, myTeammates } = myTeamStore
  const [searchValue, setSearchValue] = useState('')

  const filterList = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchValue(value)
  }
  return { users, addTeammate, myTeammates, filterList, searchValue }
}
