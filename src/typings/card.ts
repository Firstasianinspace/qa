export interface ICard {
  id: string;
  number: string;
  cvv: string;
  expiration_date: string;
  name: string;
  is_default: boolean;
  maskedNumber?: string;
  label?: string;
  value?: string;
}

export interface ICardPost {
  number: string;
  cvv: string;
  expiration_date: string;
  name: string;
  user_id: string;
}

export interface ICardDefault {
  user_id: string;
  card_id: string;
}
