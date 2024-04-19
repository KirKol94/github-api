import { $api } from '@/shared/api'
import { AxiosResponse, AxiosError } from 'axios'
import { makeAutoObservable } from 'mobx'
import { GHRepo } from '../types'

interface ReposState {
  repositories: GHRepo[]
  isLoading: boolean
  error: string | null
  fetchRepositories: (url: string) => void
}

class ReposDataStore implements ReposState {
  constructor() {
    makeAutoObservable(this)
  }

  repositories: GHRepo[] = []
  isLoading: boolean = false
  error: string | null = null

  fetchRepositories = (url: string) => {
    this.isLoading = true
    this.error = null
    $api<GHRepo[]>(url)
      .then(this.successFetch, this.failedFetch)
      .finally(() => (this.isLoading = false))
  }

  private successFetch = (data: AxiosResponse<GHRepo[]>) => {
    this.repositories = data.data
  }

  private failedFetch = (error: AxiosError) => {
    this.error = error.message
  }
}

export const reposDataStore = new ReposDataStore()
