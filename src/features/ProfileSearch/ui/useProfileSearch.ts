import { profileStore } from '@/entities/Profile'
import { useState } from 'react'

export const useProfileSearch = () => {
  const { fetchProfile } = profileStore
  const [login, setLogin] = useState('')

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLogin(event.target.value)
    fetchProfile(`https://api.github.com/users/${login}`)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
  }

  return { login, handleChange, handleSubmit }
}
