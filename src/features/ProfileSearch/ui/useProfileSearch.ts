import { profileStore } from '@/entities/Profile'
import { useDebounce } from '@/shared/hooks/useDebounce'
import { useEffect, useState } from 'react'

export const useProfileSearch = () => {
  const { fetchProfile } = profileStore
  const [login, setLogin] = useState('')
  const debouncedLogin = useDebounce(login, 500)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLogin(event.target.value)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
  }

  useEffect(() => {
    fetchProfile(`https://api.github.com/users/${debouncedLogin ? debouncedLogin : 'kirkol94'}`)
  }, [debouncedLogin, fetchProfile])

  return { login, handleChange, handleSubmit }
}
