import { Component } from '@angular/core';
import { Product } from '../../../service/product/product';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../../service/product/product.service';
import { CartService } from '../../../service/shoppingcart/cart.service';
import { CartItem } from '../../../service/shoppingcart/cartitem';
import { FormatterService } from '../../../service/util/formatter.service';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrl: './product-page.component.css'
})
export class ProductPageComponent {

  product: Product | undefined;
  selectedQuantity: number | undefined;
  selectedSize: string = "";
  addToCartQuantity: number = 1;

  constructor(private formatterService: FormatterService, private cartService: CartService, private productService: ProductService, private activatedRoute: ActivatedRoute) { }

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

  selectSize(size: string, quantity: number): void {
    this.selectedSize = size;

    this.displayQuantity(quantity);
  }

  displayQuantity(quantity: number) {
    this.selectedQuantity = quantity;
  }

  updateQuantity(newQuantity: number): void {
    if (newQuantity >= 0) {
      this.addToCartQuantity = newQuantity;
    }
  }

  addToCart() {
    if (this.selectedSize && this.product) {
      const cartItem: CartItem = {
        id: this.product.id.toString() + this.selectedSize,
        name: this.product.name,
        price: this.product.price,
        size: this.selectedSize,
        quantity: this.addToCartQuantity,
        image: this.product.productPhotos?.[0]?.imageUrl,
        color: this.product.color,
        available: this.productService.getAvailableQuantityBySize(this.product, this.selectedSize) || 0,
        productId: this.product.id
      };

      this.cartService.addItem(cartItem);

    }
  }

  formatPrice(price: number): string {
    return this.formatterService.formatPrice(price);
  }
}
