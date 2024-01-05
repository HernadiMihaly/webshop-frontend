import { ProductPhoto } from "./productphoto";
import { ProductStock } from "./productstock";

export interface  Product {

    id: number;

    name: string;

    color: string;

    price: number;

    description: string;

    materials: string;

    brand: string;
    
    createdAt: Date;

    category: number;

    productPhotos: ProductPhoto[]; 

    productStocks: ProductStock[];

}
