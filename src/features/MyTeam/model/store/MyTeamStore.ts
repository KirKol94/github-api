import { makeAutoObservable } from 'mobx'

type MyTeammate = {
  id: number
  login: string
  avatar_url: string
  html_url: string
}

interface MyTeamState {
  myTeammates: MyTeammate[]
  addTeammate: (teammate: MyTeammate) => void
  removeTeammate: (id: number) => void
}

class MyTeamStore implements MyTeamState {
  constructor() {
    makeAutoObservable(this)
  }

  myTeammates: MyTeammate[] = []

  addTeammate = (teammate: MyTeammate) => {
    if (!this.myTeammates.find(item => item.id === teammate.id)) {
      this.myTeammates = [...this.myTeammates, teammate]
    }
  }

  removeTeammate = (id: number) => {
    this.myTeammates = this.myTeammates.filter(teammate => teammate.id !== id)
  }
}

export const myTeamStore = new MyTeamStore()
