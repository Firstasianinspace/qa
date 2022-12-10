import { defineStore } from "pinia";
import BaseApi from "@/api/BaseApi";
import type { IProduct } from "@/typings/product";
import type { ICategory } from "@/typings/categories";

//* using option store syntax
export const useCatalog = defineStore("catalog", {
  state: () => {
    const products: IProduct[] = [];
    const categories: ICategory[] = [];
    return {
      products,
      categories,
    };
  },
  getters: {
    productCount: (state) => state.products.length || 0,
  },
  actions: {
    async getProducts() {
      try {
        const { data } = await BaseApi.get("/api/items?limit=50");
        this.products = data.items.map((s: IProduct) => ({
          ...s,
          quantity: 0,
          discount: s.discount_price
            ? parseInt(s.price) - parseInt(s.discount_price)
            : 0,
        }));
      } catch (e) {
        console.log(e);
      }
    },
    async getProduct(payload: number) {
      try {
        const { data } = await BaseApi.get(
          `api/items?item_id=${payload}&offset=0&limit=50`
        );
        this.products = data.items.map((s: IProduct) => ({
          ...s,
          discount: s.discount_price
            ? parseInt(s.price) - parseInt(s.discount_price)
            : 0,
        }));
      } catch (e) {
        console.log(e);
      }
    },
    async getCategories() {
      try {
        const { data } = await BaseApi.get("/api/categories?limit=50");
        this.categories = data.categories;
      } catch (e) {
        console.log(e);
      }
    },
    // async fetchUser() {
    //   try {
    //     const { data } = await (new PersonalApi(context.$baseApi, context)).getProfile()
    //     this.profile = data
    //   } catch (e) {
    //     console.log(e)
    //   }
    // },
    // async authRegister(authData: IAuthData) {
    //   const { data } = await (new AuthApi($baseApi)).authRegister(authData)
    // },
  },
});
