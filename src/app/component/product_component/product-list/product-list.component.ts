import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from '../../../service/product.service';
import { Product } from '../../../service/product';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent {
  products: Product[] | undefined;

  constructor(private router: Router, private productService: ProductService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {

      const categoryIdString = params.get('categoryId');
      const categoryId = categoryIdString ? parseInt(categoryIdString, 10) : null;
      
      if (categoryId) {
        this.productService.getProductsByCategory(categoryId).subscribe((products) => {
          this.products = products;
        });
      } else {
        this.productService.getAllProducts().subscribe((products) => {
          this.products = products;
        });
      }
    });
    
  }
}
