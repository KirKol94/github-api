import { useEffect, useState } from 'react'

type ApiResponse<T> = {
  data: T | null
  error: string | null
  isLoading: boolean
}

export const useFetch = <T>(url: string): ApiResponse<T> => {
  const [data, setData] = useState<T | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      try {
        const response = await fetch(url, {
          headers: {
            Accept: 'application/vnd.github+json',
            'User-Agent': 'kirkol94',
          },
        })
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }
        const responseData: T = await response.json()
        setData(responseData)
        setError(null)
      } catch (e) {
        setError((e as Error).message)
        setData(null)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [url])

  return { data, error, isLoading }
}
