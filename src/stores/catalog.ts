import { defineStore } from "pinia";
import BaseApi from "@/api/BaseApi";
import type { IProduct } from "@/typings/product";
import type { ICategory } from "@/typings/categories";
import type { IBrand } from "@/typings/brands";

//* using option store syntax
export const useCatalog = defineStore("catalog", {
  state: () => {
    const products: IProduct[] = [];
    const categories: ICategory[] = [];
    const brands: IBrand[] = [];
    return {
      products,
      categories,
      brands,
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
          quantity: 1,
          currentPrice: s.discount_price
            ? parseInt(s.discount_price)
            : parseInt(s.price),
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
          quantity: 1,
          currentPrice: s.discount_price
            ? parseInt(s.discount_price)
            : parseInt(s.price),
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
    async getBrands() {
      try {
        const { data } = await BaseApi.get("/api/brands?limit=50");
        this.brands = data.brands;
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
