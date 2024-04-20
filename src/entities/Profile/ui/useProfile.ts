import { useState, useEffect } from 'react'
import { profileStore } from '../model/store/profileStore'

export const useProfile = () => {
  const { fetchProfile, profile, error, isLoading } = profileStore
  const [login, setLogin] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    fetchProfile(`https://api.github.com/users/${login}`)
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
