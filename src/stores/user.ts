import { defineStore } from 'pinia'
import BaseApi from '@/api/BaseApi'
import type { IProfileData, IAuthData } from '@/typings/profile'

//* using option store syntax
export const useUser = defineStore('user', {
  persist: true,
  state: () => {
    const profile: IProfileData = <IProfileData>{}
    return {
      profile,
      initialized: false,
      token: '',
    }
  },
  getters: {
    loggedIn: state => state.initialized && !!state.profile.userID,
    hasToken: state => state.initialized && !!localStorage.getItem('authToken')
  },
  actions: {
    setUser(payload: IProfileData) {
      this.profile = payload
    },
    async init() {
      await this.fetchUser()
      this.initialized = true
    },
    async logout() {
      this.initialized = false
    },
    async fetchUser() {
      try {
        /* TO-DO Пока один пользователь тянем дефолт 1 */
        const { data } = await BaseApi.get(`/api/user?userID=1`)
        this.profile = data
      } catch (e) {
        console.log(e)
      }
    },
    async authLogin(authData: IAuthData) {
      await BaseApi.post('api/auth', authData).then((response) => {
        const token = response.headers['grpc-metadata-authorization']
        console.log('about to set token')
        localStorage.setItem('authToken', token);
        this.token = token
      })
    },
  }
})