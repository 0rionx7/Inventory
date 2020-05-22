import { Book } from './book';

export interface CartItem {
  id: string;
  amount: number;
  product: Book;
}
