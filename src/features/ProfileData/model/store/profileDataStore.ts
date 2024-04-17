import axios, { AxiosResponse } from 'axios'
import { makeAutoObservable } from 'mobx'
import { GHProfile } from '../types'

interface ProfileState {
  profile: GHProfile | null
  isLoading: boolean
  error: string | null
  fetchProfile: () => void
}

class ProfileDataStore implements ProfileState {
  constructor() {
    makeAutoObservable(this)
  }

  profile: GHProfile | null = null
  isLoading: boolean = false
  error: string | null = null

  fetchProfile = () => {
    this.isLoading = true
    this.error = null
    axios<GHProfile>('https://api.github.com/users/kirkol94', {
      headers: {
        Accept: 'application/vnd.github+json',
        'User-Agent': 'kirkol94',
      },
    }).then(this.successFetch, this.failedFetch)
    this.isLoading = false
  }

  private successFetch = (res: AxiosResponse<GHProfile>) => {
    this.profile = res.data
  }

  private failedFetch = (error: string) => {
    this.error = error
  }
}

export const profileDataStore = new ProfileDataStore()
