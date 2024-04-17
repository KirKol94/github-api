import axios, { AxiosResponse } from 'axios'
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
    axios<GHRepo[]>(url, {
      headers: {
        Accept: 'application/vnd.github+json',
        'User-Agent': 'kirkol94',
      },
    }).then(this.successFetch, this.failedFetch)
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
