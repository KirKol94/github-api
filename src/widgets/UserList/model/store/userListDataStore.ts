import { $api } from '@/shared/api'
import { AxiosError, AxiosResponse } from 'axios'
import { makeAutoObservable, runInAction } from 'mobx'
import { GHUser } from '../types'

interface UserListState {
  users: GHUser[]
  isLoading: boolean
  error: string | null
  fetchUsers: (url: string) => void
}

class UserListDataStore implements UserListState {
  constructor() {
    makeAutoObservable(this)
  }

  users: GHUser[] = []
  isLoading: boolean = false
  error: string | null = null

  fetchUsers = async (url: string) => {
    runInAction(() => {
      this.isLoading = true
      this.error = null
    })

    try {
      const res = await $api<GHUser[]>(url)
      runInAction(() => this.successFetch(res))
    } catch (error) {
      if (error instanceof AxiosError) runInAction(() => this.failedFetch(error))
      else throw error
    } finally {
      runInAction(() => (this.isLoading = false))
    }
  }

  private successFetch = (res: AxiosResponse<GHUser[]>) => {
    this.users = res.data
  }

  private failedFetch = (error: AxiosError) => {
    this.error = error.message
  }
}

export const userListDataStore = new UserListDataStore()
