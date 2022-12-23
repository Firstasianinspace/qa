import { defineStore } from "pinia";
import BaseApi from "@/api/BaseApi";
import type { ICard, ICardPost, ICardDefault } from "@/typings/card";
import { maskCard } from "@/helpers";

//* using option store syntax
export const usePayment = defineStore("payment", {
  state: () => {
    const cards: ICard[] = [];
    return {
      cards,
    };
  },
  getters: {
    defaultCard: ({ cards }) => {
      if (!cards.length) return null;
      return cards.filter((s) => s.is_default);
    },
  },
  actions: {
    async fetchCards(userID: string) {
      try {
        const { data } = await BaseApi.get(
          `/api/get_cards_by_user_id?user_id=${userID}`
        );
        this.cards = data?.cards
          .filter(
            (s: ICard) =>
              s.number && s.number.length > 18 && s.number.length < 22
          )
          .map((s: ICard) => ({
            ...s,
            label: maskCard(s.number),
            value: maskCard(s.number),
          }))
          .concat({
            label: "Новая карта",
            value: "Новая карта",
          });
      } catch (e) {
        console.log(e);
      }
    },
    async addCreditCard(payload: ICardPost) {
      try {
        await BaseApi.post("api/buy2", payload);
      } catch (e) {
        console.log(e);
      }
    },
    async setDefaultCard(payload: ICardDefault) {
      try {
        await BaseApi.post("api/set_default_card", payload);
      } catch (e) {
        console.log(e);
      }
    },
    async purchaseItems(products: string[], userID: string) {
      const formData = {
        item_id: products,
        user_id: userID,
      };
      await BaseApi.post(`/api/buy1`, formData);
    },
  },
});
