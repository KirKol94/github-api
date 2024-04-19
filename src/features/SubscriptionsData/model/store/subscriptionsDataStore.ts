import { $api } from '@/shared/api'
import { AxiosError, AxiosResponse } from 'axios'
import { makeAutoObservable, runInAction } from 'mobx'
import { GHSubscription } from '../types'

interface SubscriptionsState {
  subscriptions: GHSubscription[]
  isLoading: boolean
  error: string | null
  fetchSubscriptions: (url: string) => void
}

class SubscriptionsDataStore implements SubscriptionsState {
  constructor() {
    makeAutoObservable(this)
  }

  subscriptions: GHSubscription[] = []
  isLoading: boolean = false
  error: string | null = null

  fetchSubscriptions = async (url: string) => {
    runInAction(() => {
      this.isLoading = true
      this.error = null
    })
    try {
      const correctUrl = url.replace('{/other_user}', '')
      const res = await $api<GHSubscription[]>(correctUrl)
      runInAction(() => this.successFetch(res))
    } catch (error) {
      if (error instanceof AxiosError) runInAction(() => this.failedFetch(error))
      else throw error
    } finally {
      runInAction(() => (this.isLoading = false))
    }
  }

  private successFetch = (res: AxiosResponse<GHSubscription[]>) => {
    this.subscriptions = res.data
  }

  private failedFetch = (error: AxiosError) => {
    this.error = error.message
  }
}

export const subscriptionsDataStore = new SubscriptionsDataStore()
