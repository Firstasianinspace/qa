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
