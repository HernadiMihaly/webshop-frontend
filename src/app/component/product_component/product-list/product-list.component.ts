import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from '../../../service/product.service';
import { Product } from '../../../service/product';
import { Category } from '../../../service/category';
import { CategoryService } from '../../../service/category.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent {
  products: Product[] | undefined;

  constructor(private router: Router, private productService: ProductService, private categoryService: CategoryService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {

      const categoryIdString = params.get('categoryId');
      
      if (categoryIdString == "men" || categoryIdString == "women" || categoryIdString == "children"){
          this.getProductsByCategoryName(categoryIdString);
      }
      else{
        const categoryId = categoryIdString ? parseInt(categoryIdString, 10) : null;
        
        if (categoryId) {
          this.productService.getProductsByCategory(categoryId).subscribe((products) => {
            this.products = products;
        });
        } else {
          this.router.navigate(['/']);
        }
      }
    });
  }
  getProductsByCategoryName(categoryName: string) {
    switch (categoryName) {
      case "men":
        this.productService.getAllMaleProducts().subscribe((products) => {
          this.products = products;
      });
      break;
      case "women":
        this.productService.getAllFemaleProducts().subscribe((products) => {
          this.products = products;
      });
      break;
      case "children":
        this.productService.getAllChildrenProducts().subscribe((products) => {
          this.products = products;
      });
      break;
    }
  }


}
