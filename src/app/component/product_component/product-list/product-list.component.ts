import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { HttpParams } from '@angular/common/http';

import { ProductService } from '../../../service/product/product.service';
import { Product } from '../../../service/product/product';
import { Subject, debounceTime } from 'rxjs';
import { CartItem } from '../../../service/shoppingcart/cartitem';
import { CartService } from '../../../service/shoppingcart/cart.service';
import { FormatterService } from '../../../service/util/formatter.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements AfterViewInit {
  // Public properties
  products: Product[] | undefined;
  colors = ['Fehér', 'Fekete', 'Bézs', 'Barna', 'Szürke', 'Krémszínű', 'Törtfehér', 'Piros', 'Zöld', 'Kék', 'Tengerészkék', 'Rózsaszín'];
  sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'EU 36', 'EU 37', 'EU 38', 'EU 39', 'EU 40', 'EU 41', 'EU 42', 'EU 43', 'EU 44', 'EU 45'];
  prevPath = "";
  selectedSize = "";

  // Form Group
  filterForm: FormGroup;

  // ViewChild
  @ViewChild('minInput') minInput!: ElementRef;
  @ViewChild('maxInput') maxInput!: ElementRef;
  @ViewChild('colorCheckbox') colorCheckbox!: ElementRef;

  // Range values
  minValue = 0;
  maxValue = 50000;

  private debounceSubject = new Subject<void>();

  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private activatedRoute: ActivatedRoute,
    private cartService: CartService,
    private formatterService: FormatterService
  ) {
    // Initialize form group
    this.filterForm = this.formBuilder.group({
      colors: this.formBuilder.array([]),
      size: 'all',
      minPrice: 0,
      maxPrice: 50000,
      sortBy: 'newest'
    });
  }

  // Lifecycle hook
  ngOnInit(): void {
    this.updateProducts();
  }

  ngAfterViewInit() {
    this.minInput.nativeElement.addEventListener('input', () => this.validateRange());
    this.maxInput.nativeElement.addEventListener('input', () => this.validateRange());

    // A változásokat 1 másodperces késleltetéssel figyeljük meg
    this.minInput.nativeElement.addEventListener('input', () => {
      this.debounceSubject.next();
    });

    this.maxInput.nativeElement.addEventListener('input', () => {
      this.debounceSubject.next();
    });

    // Feliratkozás a Subject-re a debounceTime operátorral
    this.debounceSubject.pipe(debounceTime(1300)).subscribe(() => {
      this.updateProducts();
    });
  }

  // Public methods
  updateProducts() {
    this.activatedRoute.queryParams.subscribe(params => {
      const searchParam = params['search'];

      if (searchParam) {
        this.loadProductsBySearchParams(searchParam);
      } else {
        this.loadProductsBySelectedPage();
      }
    });
  }

  getProductsByColor(e: any) {
    this.addColorToColorsFormArray(e);
    this.updateProducts();
  }

  setSelectedSize(size: string): void {
    this.selectedSize = size;
  }

  clearSelectedSize(): void {
    this.selectedSize = '';
  }

  // Private methods
  private clearForm() {
    this.filterForm = this.formBuilder.group({
      colors: this.formBuilder.array([]),
      size: 'all',
      minPrice: 0,
      maxPrice: 50000,
      sortBy: 'newest'
    });

    this.minValue = 0;
    this.maxValue = 50000;

    this.uncheckCheckboxElements();

    this.updateDisplayedRangeValues(0, 50000);
  }

  private loadProductsBySearchParams(searchParam: string) {
    this.productService.getAllProductsByParams(this.getHttpParams()).subscribe((products) => {
      /**TODO: ezt a logikát ki kéne szervezni majd */
      const searchTerms = searchParam.toLowerCase().split(' ');

      this.products = products.filter(product => {
        return searchTerms.every(term =>
          product.name.toLowerCase().includes(term) ||
          product.description.toLowerCase().includes(term) ||
          product.color.toLowerCase().includes(term) ||
          product.materials.toLowerCase().includes(term)
        );
      });

    });
  }

  private loadProductsBySelectedPage() {
    this.activatedRoute.paramMap.subscribe(params => {
      const categoryIdString = params.get('categoryId');

      if (categoryIdString == "men" || categoryIdString == "women" || categoryIdString == "children") {
        this.getProductsByCategoryName(categoryIdString);
      } else {
        const categoryId = categoryIdString ? parseInt(categoryIdString, 10) : null;
        this.getProductsByCategoryId(categoryId);
      }
    });
  }

  private getProductsByCategoryName(categoryName: string) {
    switch (categoryName) {
      case "men":
        this.productService.getAllMaleProducts(this.getHttpParams()).subscribe((products) => {
          this.products = products;
          this.prevPath = "/products/men";
        });
        break;
      case "women":
        this.productService.getAllFemaleProducts(this.getHttpParams()).subscribe((products) => {
          this.products = products;
          this.prevPath = "/products/women";
        });
        break;
      case "children":
        this.productService.getAllChildrenProducts(this.getHttpParams()).subscribe((products) => {
          this.products = products;
          this.prevPath = "/products/children";
        });
        break;
    }
  }

  private getProductsByCategoryId(categoryId: number | null) {
    if (categoryId) {
      if (this.prevPath != ("/products/" + categoryId)) {
        this.clearForm();
      }
      this.productService.getProductsByCategory(categoryId, this.getHttpParams()).subscribe((products) => {
        this.products = products;
        this.prevPath = "/products/" + categoryId;
      });
    }
  }

  private getHttpParams(): HttpParams {
    let queryParams = new HttpParams();

    queryParams = queryParams
      .append("colors", this.filterForm.value.colors.join(',').toLowerCase())
      .append("size", this.filterForm.value.size)
      .append("sortBy", this.filterForm.value.sortBy)
      .append("minPrice", this.minValue)
      .append("maxPrice", this.maxValue);

    console.log(queryParams.toString());

    return queryParams;
  }

  private addColorToColorsFormArray(e: any) {
    let colorArray = this.filterForm.get("colors") as FormArray;

    if (e.target.checked) {
      colorArray.push(new FormControl(e.target.value));
    } else {
      let i = 0;
      colorArray.controls.forEach((c: any) => {
        if (c.value == e.target.value) {
          colorArray.removeAt(i);
          return;
        }
        i++;
      });
    }
  }

  //Price-Range panel validation
  private validateRange() {
    const minPrice = parseInt(this.minInput.nativeElement.value);
    const maxPrice = parseInt(this.maxInput.nativeElement.value);

    if (minPrice > maxPrice) {
      const tempValue = maxPrice;
      this.maxValue = minPrice;
      this.minValue = tempValue;
    } else {
      this.minValue = minPrice;
      this.maxValue = maxPrice;
    }

    this.updateDisplayedRangeValues();
  }

  private updateDisplayedRangeValues(...args: any[]) {
    if (typeof document !== 'undefined') {
      const minValueElement = document.getElementById('min-value');
      const maxValueElement = document.getElementById('max-value');

      if (minValueElement && maxValueElement) {
        if (args.length > 0) {
          minValueElement.innerHTML = args[0] + ' Ft';
          maxValueElement.innerHTML = args[1] + ' Ft';
        } else {
          minValueElement.innerHTML = this.minValue + ' Ft';
          maxValueElement.innerHTML = this.maxValue + ' Ft';
        }
      }
    }
  }

  private uncheckCheckboxElements() {
    if (typeof document !== 'undefined') {
      this.colors.forEach(color => {
        const checkbox = document.getElementById(
          color + 'Checkbox'
        ) as HTMLInputElement | null;

        if (checkbox)
          checkbox.checked = false;
      })
    }
  }

  addToCart(product: Product) {
    if (this.selectedSize) {
      const cartItem: CartItem = {
        id: product.id.toString() + this.selectedSize,
        name: product.name,
        price: product.price,
        size: this.selectedSize,
        quantity: 1,
        image: product.productPhotos?.[0]?.imageUrl,
        color: product.color,
        available: this.productService.getAvailableQuantityBySize(product, this.selectedSize) || 0,
        productId: product.id
      };

      this.cartService.addItem(cartItem);
    }

    this.selectedSize = "";
  }

  formatPrice(price: number): string {
    return this.formatterService.formatPrice(price);
  }
}
