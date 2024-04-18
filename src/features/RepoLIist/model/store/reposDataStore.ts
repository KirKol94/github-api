import { $api } from '@/shared/api'
import { AxiosResponse } from 'axios'
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
    $api<GHRepo[]>(url).then(this.successFetch, this.failedFetch)
    this.isLoading = false
  }

  private successFetch = (data: AxiosResponse<GHRepo[]>) => {
    this.repositories = data.data
  }

  private failedFetch = (error: string) => {
    this.error = error
  }
}

export const reposDataStore = new ReposDataStore()
