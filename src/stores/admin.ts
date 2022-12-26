import { defineStore } from "pinia";
import BaseApi from "@/api/BaseApi";
import type { IProductPost } from "@/typings/admin";

//* using option store syntax
export const useAdmin = defineStore("admin", {
  state: () => {
    return {};
  },
  getters: {},
  actions: {
    async addProductToDatabase(product: IProductPost) {
      try {
        await BaseApi.post("api/add", product);
      } catch (e) {
        console.log(e);
      }
    },
  },
});
