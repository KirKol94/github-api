import { $api } from '@/shared/api'
import { AxiosResponse } from 'axios'
import { makeAutoObservable } from 'mobx'
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

  fetchSubscriptions = (url: string) => {
    this.isLoading = true
    this.error = null
    const correctUrl = url.replace('{/other_user}', '')
    $api<GHSubscription[]>(correctUrl).then(this.successFetch, this.failedFetch)
    this.isLoading = false
  }

  private successFetch = (res: AxiosResponse<GHSubscription[]>) => {
    this.subscriptions = res.data
  }

  private failedFetch = (error: string) => {
    this.error = error
  }
}

export const subscriptionsDataStore = new SubscriptionsDataStore()
