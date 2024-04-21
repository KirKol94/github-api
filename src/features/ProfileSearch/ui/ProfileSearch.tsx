import { Button, TextField } from '@mui/material'
import { useProfileSearch } from './useProfileSearch'
import c from './ProfileSearch.module.css'

export const ProfileSearch = () => {
  const { login, handleChange, handleSubmit } = useProfileSearch()

  return (
    <form onSubmit={handleSubmit} className={c.form}>
      <TextField
        className={c.input}
        fullWidth
        label="Type here other login"
        variant="filled"
        value={login}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />

      <Button type="submit" variant="contained">
        Search
      </Button>
    </form>
  )
}
