import { number } from "yup";

export interface IProduct {
  id: number;
  title: string;
  description: string;
  price: number;
  thumbnail: string;
  rating: number;
  stock: number;
  category: string;
  brand: string;
  images: string[];
};

export type TProductOnlyString = Omit<IProduct, 'id' | 'price' | 'rating' | 'stock' | 'images'>

export interface IMinMaxValuesOfProducts {
  minPrice: number;
  maxPrice: number;
  minStock: number;
  maxStock: number;
  minRating: number;
  maxRating: number;
}