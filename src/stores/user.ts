import { defineStore } from "pinia";
import BaseApi from "@/api/BaseApi";
import type { IProfileData, IAuthData } from "@/typings/profile";
import { Cookies } from "quasar";

//* using option store syntax
export const useUser = defineStore("user", {
  persist: {
    storage: sessionStorage,
  },
  state: () => {
    const profile: IProfileData = <IProfileData>{};
    return {
      profile,
      initialized: false,
      token: "",
    };
  },
  getters: {
    loggedIn: (state) => state.initialized && !!state.profile.userID,
    hasToken: () => Cookies.has("authToken"),
  },
  actions: {
    setUser(payload: IProfileData) {
      this.profile = payload;
    },
    async init() {
      await this.fetchUser();
      this.initialized = true;
    },
    async logout() {
      this.initialized = false;
    },
    async fetchUser() {
      try {
        /* TO-DO Пока один пользователь тянем дефолт 1 */
        const { data } = await BaseApi.get(`/api/user?userID=1`);
        this.profile = data;
      } catch (e) {
        console.log(e);
      }
    },
    async authLogin(authData: IAuthData) {
      await BaseApi.post("api/auth", authData).then((response) => {
        const token = response.headers["grpc-metadata-authorization"];
        console.log(token);
        Cookies.set("authToken", token);
        this.token = token;
      });
      this.init();
    },
  },
});
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2NzEzNzMxMzAsImlzcyI6IjEifQ.gLR3vfQqzB9rd58CHO-980oNYUmETFA08tiUbYc1H3g
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2NzEzNzMxMzAsImlzcyI6IjEifQ.gLR3vfQqzB9rd58CHO-980oNYUmETFA08tiUbYc1H3g
