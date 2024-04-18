import axios from 'axios'

export const $api = axios.create({
  headers: {
    Accept: 'application/vnd.github+json',
  },
})
