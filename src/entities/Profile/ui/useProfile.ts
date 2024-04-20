import { useEffect } from 'react'
import { profileStore } from '../model/store/profileStore'

export const useProfile = () => {
  const { fetchProfile, profile, error, isLoading } = profileStore

  useEffect(() => {
    fetchProfile('https://api.github.com/users/kirkol94')
  }, [fetchProfile])

  return {
    isLoading,
    error,
    profile,
  }
}
