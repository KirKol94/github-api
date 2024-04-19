import { myTeamStore } from '@/features/MyTeam'
import { useState } from 'react'

export const useMyTeam = () => {
  const { myTeammates, removeTeammate } = myTeamStore
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')

  const handleSortClick = () => {
    setSortOrder(prev => (prev === 'asc' ? 'desc' : 'asc'))
  }

  const sortedUsers = myTeammates ? [...myTeammates] : []

  sortedUsers.sort((a, b) => {
    if (sortOrder === 'asc') {
      return a.login.localeCompare(b.login)
    } else {
      return b.login.localeCompare(a.login)
    }
  })

  return { myTeammates, removeTeammate, sortedUsers, sortOrder, handleSortClick }
}
