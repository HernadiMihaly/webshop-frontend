import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrl: './product-page.component.css'
})
export class ProductPageComponent {
  slides = [
    {image:"https://dummyimage.com/600x700/dee2e6/6c757d.jpg"},
    {image:"https://www.ikea.com/hu/hu/images/products/bjoerksta-kep-mona-lisa__0809958_pe771199_s5.jpg?f=s"},
    {image:"https://wallpapercave.com/wp/wp4471355.jpg"}
  ];
}
