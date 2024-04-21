import axios from 'axios'
import { useCallback, useEffect, useState } from 'react'
import { GHContributor } from '../model/types'

export const useCardRepository = (contributors_url: string) => {
  const [contributors, setContributors] = useState<GHContributor[]>([])

  const fetchData = useCallback(async () => {
    const res = await axios<GHContributor[]>(contributors_url)
    setContributors(res.data)
  }, [])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return { contributors }
}
