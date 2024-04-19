import { useState, useEffect } from 'react'
import { profileDataStore } from '../model/store/profileDataStore'

export const useProfileData = () => {
  const { fetchProfile, profile, error, isLoading } = profileDataStore
  const [login, setLogin] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    fetchProfile('https://api.github.com/users/' + login)
  }

  useEffect(() => {
    fetchProfile('https://api.github.com/users/kirkol94')
  }, [fetchProfile])

  return {
    isLoading,
    error,
    profile,
    login,
    setLogin,
    handleSubmit,
  }
}
