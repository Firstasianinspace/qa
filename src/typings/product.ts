export interface IProduct {
  item_id: string;
  title: string;
  description: string;
  item_image_url: string;
  price: string;
  discount_price: string;
  discount: number;
  category: string;
  brand: string;
}

export interface IBasketItem {
  item_id: string;
  title: string;
  description: string;
  item_image_url: string;
  price: string;
  currentPrice: number;
  discount_price: string;
  discount: number;
  category: string;
  brand: string;
  quantity: number;
}

export interface IOrderItem {
  id: string;
  buy_date: string;
  user_id: string;
  item_id: string | string[];
  card_id: string;
}
