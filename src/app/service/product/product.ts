import { ProductPhoto } from "./productphoto";
import { ProductStock } from "./productstock";

export interface  Product {

    id: number;

    name: String;

    color: String;

    price: number;

    description: String;

    materials: String;

    brand: String;
    
    createdAt: Date;

    category: number;

    productPhotos: ProductPhoto[]; 

    productStocks: ProductStock[];

}
