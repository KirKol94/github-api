import { $api } from '@/shared/api'
import { AxiosResponse, AxiosError } from 'axios'
import { makeAutoObservable, runInAction } from 'mobx'
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

  fetchRepositories = async (url: string) => {
    runInAction(() => {
      this.isLoading = true
      this.error = null
    })

    try {
      const res = await $api<GHRepo[]>(url)
      runInAction(() => this.successFetch(res))
    } catch (error) {
      if (error instanceof AxiosError) runInAction(() => this.failedFetch(error))
      else throw error
    } finally {
      runInAction(() => (this.isLoading = false))
    }
  }

  private successFetch = (res: AxiosResponse<GHRepo[]>) => {
    this.repositories = res.data.sort((a, b) => b.updated_at.localeCompare(a.updated_at))
  }

  private failedFetch = (error: AxiosError) => {
    this.error = error.message
  }
}

export const reposDataStore = new ReposDataStore()
