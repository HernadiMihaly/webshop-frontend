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
  parentCategory: Category | undefined;

  constructor(private router: Router, private productService: ProductService, private categoryService: CategoryService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {

      const categoryIdString = params.get('categoryId');
      const categoryId = categoryIdString ? parseInt(categoryIdString, 10) : null;
      
      if (categoryId) {
        this.productService.getProductsByCategory(categoryId).subscribe((products) => {
          this.products = products;
          
          this.categoryService.getParentCategory(categoryId).subscribe((parentCategory) => {
            this.parentCategory = parentCategory;
            console.log(parentCategory.name)
        });
      });
      } else {
        this.productService.getAllProducts().subscribe((products) => {
          this.products = products;
        });
      }
    });
    

  }
}
