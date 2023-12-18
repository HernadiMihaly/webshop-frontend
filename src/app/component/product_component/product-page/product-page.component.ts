import { Component } from '@angular/core';
import { Product } from '../../../service/product';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from '../../../service/product.service';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrl: './product-page.component.css'
})
export class ProductPageComponent {
  product: Product | undefined;
  
  slides = [
    {image:"https://dummyimage.com/600x700/dee2e6/6c757d.jpg"},
    {image:"https://www.ikea.com/hu/hu/images/products/bjoerksta-kep-mona-lisa__0809958_pe771199_s5.jpg?f=s"},
    {image:"https://wallpapercave.com/wp/wp4471355.jpg"}
  ];

  constructor(private router: Router, private productService: ProductService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {

      const productIdString = params.get('id');
      const productId = productIdString ? parseInt(productIdString, 10) : null;
      
      if (productId) {
        this.productService.getProduct(productId).subscribe((product) => {
          this.product = product;
        });
      }
    });
    
  }


}
