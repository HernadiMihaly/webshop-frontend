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
  selectedQuantity: number | undefined;

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

  displayQuantity(quantity: number) {
      this.selectedQuantity = quantity;
    }


}
