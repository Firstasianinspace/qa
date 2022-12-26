import { defineStore } from "pinia";
import BaseApi from "@/api/BaseApi";
import type { IProfileData, IAuthData } from "@/typings/profile";
import type { IOrderItem } from "@/typings/product";
import { Cookies } from "quasar";

//* using option store syntax
export const useUser = defineStore("user", {
  persist: {
    storage: sessionStorage,
  },
  state: () => {
    const profile: IProfileData = <IProfileData>{};
    const profileOrders: IOrderItem[] = [];
    return {
      profile,
      initialized: false,
      token: "",
      profileOrders,
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
        Cookies.set("authToken", token);
        this.token = token;
      });
      this.init();
    },
    async getBuys(): Promise<void> {
      try {
        const { data } = await BaseApi.get(
          `api/get_buys?limit=50&offset=0&user_id=1`
        );
        this.profileOrders = data.buys.reduce(
          (acc: IOrderItem[], item: IOrderItem) => {
            const existing = acc.find(
              (innerItem: IOrderItem) => innerItem.card_id === item.card_id
            );
            if (existing) {
              existing.item_id = Array.isArray(existing.item_id)
                ? existing.item_id
                : [existing.item_id];
              existing.item_id.push(item.item_id as string);
            } else {
              acc.push(item);
            }
            return acc.reverse();
          },
          []
        );
      } catch (e) {
        console.log(e);
      }
    },
  },
});
