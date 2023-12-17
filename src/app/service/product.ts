import { Category } from "./category";

export interface  Product {

    id: number;

    name: String;

    color: String;

    price: number;

    description: String;

    materials: String;

    categoryId: number;

    imageUrl: String;

}
