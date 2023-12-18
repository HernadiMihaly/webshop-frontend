import { ProductPhoto } from "./productphoto";
import { ProductStock } from "./productstock";

export interface  Product {

    id: number;

    name: String;

    color: String;

    price: number;

    description: String;

    materials: String;

    category: number;

    productPhotos: ProductPhoto[]; 

    productStock: ProductStock[];

}
