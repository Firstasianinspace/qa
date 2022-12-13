import { defineStore } from "pinia";
import BaseApi from "@/api/BaseApi";
import type { IProduct } from "@/typings/product";

//* using option store syntax
export const useBasket = defineStore("basket", {
  persist: {
    storage: sessionStorage,
  },
  state: () => {
    const basketProducts: IProduct[] = [];
    const favoriteProducts: IProduct[] = [];
    return {
      basketProducts,
      favoriteProducts,
    };
  },
  getters: {
    basketProductCount: (state) => state.basketProducts.length || 0,
    favoriteProductCount: (state) => state.favoriteProducts.length || 0,
    basketTotal: ({ basketProducts }) => {
      if (basketProducts.length === 0) {
        return 0;
      }
      return basketProducts
        .map((x) =>
          parseInt(x.discount_price)
            ? parseInt(x.discount_price)
            : parseInt(x.price)
        )
        .reduce((a, b) => a + b);
    },
    discountTotal: ({ basketProducts }) => {
      if (basketProducts.length === 0) {
        return 0;
      }
      return basketProducts.map((x) => x.discount).reduce((a, b) => a + b);
    },
  },
  actions: {
    addProductToBasket(product: IProduct) {
      this.basketProducts.push(product);
    },
    removeProductFromBasket(product: IProduct) {
      const i = this.basketProducts.indexOf(product);
      this.basketProducts.splice(i, 1);
    },
    addProductToFavorites(product: IProduct) {
      this.favoriteProducts.push(product);
    },
    removeProductFromFavorites(product: IProduct) {
      const i = this.favoriteProducts.indexOf(product);
      this.favoriteProducts.splice(i, 1);
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
