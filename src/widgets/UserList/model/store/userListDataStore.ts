import { makeAutoObservable } from 'mobx'
import { GHUser } from '../types'
import { AxiosResponse } from 'axios'
import { $api } from '@/shared/api'

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

  fetchUsers = (url: string) => {
    this.isLoading = true
    this.error = null
    $api<GHUser[]>(url).then(this.successFetch, this.failedFetch)
    this.isLoading = false
  }

  private successFetch = (res: AxiosResponse<GHUser[]>) => {
    this.users = res.data
  }

  private failedFetch = (error: string) => {
    this.error = error
  }
}

export const userListDataStore = new UserListDataStore()
