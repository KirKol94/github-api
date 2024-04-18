import { $api } from '@/shared/api'
import { AxiosResponse } from 'axios'
import { makeAutoObservable } from 'mobx'
import { GHProfile } from '../types'

interface ProfileState {
  profile: GHProfile | null
  isLoading: boolean
  error: string | null
  fetchProfile: (url: string) => void
}

class ProfileDataStore implements ProfileState {
  constructor() {
    makeAutoObservable(this)
  }

  profile: GHProfile | null = null
  isLoading: boolean = false
  error: string | null = null

  fetchProfile = (url: string) => {
    this.isLoading = true
    this.error = null
    $api<GHProfile>(url).then(this.successFetch, this.failedFetch)
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
