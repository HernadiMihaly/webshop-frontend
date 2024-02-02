import { Component } from '@angular/core';
import { CartService } from '../../../service/shoppingcart/cart.service';
import { FormatterService } from '../../../service/util/formatter.service';

@Component({
  selector: 'app-shopping-cart-dropdown',
  templateUrl: './shopping-cart-dropdown.component.html',
  styleUrl: './shopping-cart-dropdown.component.css'
})
export class ShoppingCartDropdownComponent {

  constructor(private formatter: FormatterService , private cartService: CartService){}

  getCartQuantity() {
    return this.formatPrice(this.cartService.getCartQuantity());
  }

  getCartItems() {
    return this.cartService.getCartItems();
  }

  calculateTotal(): string | number {
    return this.formatPrice(this.cartService.getSummaryPrice());
  }

  formatPrice(price: number){
    return this.formatter.formatPrice(price);
  }

}
