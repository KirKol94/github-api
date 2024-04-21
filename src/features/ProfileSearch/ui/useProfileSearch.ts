import { profileStore } from '@/entities/Profile'
import { useState } from 'react'

export const useProfileSearch = () => {
  const { fetchProfile } = profileStore
  const [login, setLogin] = useState('')

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLogin(event.target.value)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    fetchProfile('https://api.github.com/users/' + login || 'kirKol94')
  }

  return { login, handleChange, handleSubmit }
}
