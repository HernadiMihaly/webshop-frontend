import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from '../../../service/product.service';
import { Product } from '../../../service/product';
import { CategoryService } from '../../../service/category.service';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent {
  products: Product[] | undefined;
  filteredProducts: Product[] | undefined;
  colors = ['Fehér', 'Fekete', 'Bézs', 'Barna', 'Szürke', 'Krémszínű', 'Törtfehér', 'Piros', 'Zöld', 'Kék', 'Tengerészkék', 'Rózsaszín'];
  sizes = ['Összes', 'XS', 'S', 'M', 'L', 'XL', 'XXL', 'EU 36', 'EU 37', 'EU 38', 'EU 39', 'EU 40', 'EU 41', 'EU 42', 'EU 43', 'EU 44', 'EU 45'];
  filterForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router, private productService: ProductService, private categoryService: CategoryService, private activatedRoute: ActivatedRoute) { 
    this.filterForm = this.formBuilder.group({
      colors: this.formBuilder.array([]),
      size: 'Összes',
      minPrice: 0,
      maxPrice: 100000
    });
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      const searchParam = params['search'];

      if(searchParam){
        this.loadProductsBySearchParams(searchParam);
      } else {
        this.loadProductsBySelectedPage();
      }
    });
    
  }

  handleColors(e: any) {
    let colorArray = this.filterForm.get("colors") as FormArray;

    if (e.target.checked){
      colorArray.push(new FormControl(e.target.value));
    } 
    else {
      let i = 0;
      colorArray.controls.forEach(
        (c:any) => {
          if(c.value == e.target.value){
            colorArray.removeAt(i);
            return
          }
          i++;
        }
      )
    }
  }

  private loadProductsBySearchParams(searchParam: string) {
    this.productService.getAllProducts().subscribe((products) => {
      if (searchParam) {
        const searchTerms = searchParam.toLowerCase().split(' ');
  
        this.products = products.filter(product => {
          
          return searchTerms.every(term =>
            product.name.toLowerCase().includes(term) ||
            product.description.toLowerCase().includes(term) ||
            product.color.toLowerCase().includes(term) ||
            product.materials.toLowerCase().includes(term)
          );
        });
      } else {
        this.products = products;
      }
    });
  }
  
  private loadProductsBySelectedPage(){
    this.activatedRoute.paramMap.subscribe(params => {
  
      const categoryIdString = params.get('categoryId');
      
      if (categoryIdString == "men" || categoryIdString == "women" || categoryIdString == "children"){
          this.getProductsByCategoryName(categoryIdString);
      }
      else{
        const categoryId = categoryIdString ? parseInt(categoryIdString, 10) : null;
      
        this.getProductsByCategoryId(categoryId);
      } 
    });
  }

  private getProductsByCategoryName(categoryName: string) {
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

  private getProductsByCategoryId(categoryId: number | null){
    if (categoryId) {
      this.productService.getProductsByCategory(categoryId).subscribe((products) => {
        this.products = products;
    });
    } else {
      this.router.navigate(['/']);
    }
  }

  filterProducts() {
    const formData = this.filterForm.value;
    const selectedColors = formData.colors.map((c: string) => c.toLowerCase());
    const selectedSize = formData.size;

    this.filteredProducts = this.products?.filter(product => {
        const colorFilter = this.filterByColor(product, selectedColors);
        const sizeFilter = this.filterBySize(product, selectedSize);
        const priceFilter = this.filterByPrice(product, formData.minPrice, formData.maxPrice);

        return colorFilter && sizeFilter && priceFilter;
    });
}

  private filterByColor(product: Product, selectedColors: string[]): boolean {
    const productColors = product.color.toLowerCase().split('/');
    return selectedColors.length > 0 ? productColors.some(color => selectedColors.includes(color)) : true;
  }

  private filterBySize(product: Product, selectedSize: string): boolean {
      const availableSizes = new Set(
          product.productStock
              .filter(productStockElement => productStockElement.quantity > 0)
              .map(productStockElement => productStockElement.size.toString())
      );

      const normalizedSize = selectedSize.includes('EU') ? selectedSize.split(' ')[1] : selectedSize;

      return availableSizes.has(normalizedSize) || selectedSize.toLowerCase() === 'összes';
  }

  private filterByPrice(product: Product, minPrice: number, maxPrice: number): boolean {
      return product.price >= minPrice && product.price <= maxPrice;
  }

}
