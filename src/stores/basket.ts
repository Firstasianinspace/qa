import { defineStore } from "pinia";
import type { IProduct, IBasketItem } from "@/typings/product";

//* using option store syntax
export const useBasket = defineStore("basket", {
  persist: {
    storage: sessionStorage,
  },
  state: () => {
    const basketProducts: IBasketItem[] = [];
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
        .map((x) => x.currentPrice * x.quantity)
        .reduce((a, b) => a + b);
    },
    discountTotal: ({ basketProducts }) => {
      if (basketProducts.length === 0) {
        return 0;
      }
      return basketProducts
        .map((x) => x.discount * x.quantity)
        .reduce((a, b) => a + b);
    },
    basketProductIds: ({ basketProducts }) =>
      basketProducts.flatMap((s: IBasketItem) => {
        if (s.quantity > 0) {
          return Array(s.quantity).fill(s.item_id);
        }
        return s.item_id;
      }),
    favoriteProductIds: ({ favoriteProducts }) =>
      favoriteProducts.map((s: IProduct) => s.item_id),
  },
  actions: {
    addProductToBasket(product: IBasketItem) {
      this.basketProducts.push(product);
    },
    removeProductFromBasket(product: IBasketItem) {
      const i = this.basketProducts.indexOf(product);
      this.basketProducts.splice(i, 1);
    },
    clearBasket() {
      this.basketProducts = [];
    },
    changeQuantity(itemId: string, quantity: number): void {
      this.basketProducts.map((s) => {
        if (s.item_id === itemId) {
          s.quantity = quantity;
        }
      });
    },
    addProductToFavorites(product: IProduct) {
      this.favoriteProducts.push(product);
    },
    removeProductFromFavorites(product: IProduct) {
      const i = this.favoriteProducts.indexOf(product);
      this.favoriteProducts.splice(i, 1);
    },
  },
});
