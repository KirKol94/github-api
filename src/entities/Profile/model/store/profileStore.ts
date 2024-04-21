import { $api } from '@/shared/api'
import { AxiosError, AxiosResponse } from 'axios'
import { makeAutoObservable, runInAction } from 'mobx'
import { GHProfile } from '../types'

interface ProfileState {
  profile: GHProfile | null
  isLoading: boolean
  error: string | null
  fetchProfile: (url: string) => void
}

class ProfileStore implements ProfileState {
  constructor() {
    makeAutoObservable(this)
    this.fetchProfile('https://api.github.com/users/kirkol94')
  }

  profile: GHProfile | null = null
  isLoading: boolean = false
  error: string | null = null

  fetchProfile = async (url: string) => {
    runInAction(() => {
      this.isLoading = true
      this.error = null
      this.profile = null
    })
    try {
      const res = await $api<GHProfile>(url)
      runInAction(() => this.successFetch(res))
    } catch (error) {
      if (error instanceof AxiosError) runInAction(() => this.failedFetch(error))
      else throw error
    } finally {
      runInAction(() => (this.isLoading = false))
    }
  }

  private successFetch = (res: AxiosResponse<GHProfile>) => {
    this.profile = res.data
  }

  private failedFetch = (error: AxiosError<{ message: string }>) => {
    if (error.response?.data.message) alert(error.response?.data.message)
    this.error = error.message
  }
}

export const profileStore = new ProfileStore()
