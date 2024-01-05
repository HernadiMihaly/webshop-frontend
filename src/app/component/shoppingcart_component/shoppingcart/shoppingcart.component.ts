import { Component, OnInit } from '@angular/core';
import { CartService } from '../../../service/shoppingcart/cart.service';
import { CartItem } from '../../../service/shoppingcart/cartitem';
import { FormatterService } from '../../../service/util/formatter.service';

@Component({
  selector: 'app-shoppingcart',
  templateUrl: './shoppingcart.component.html',
  styleUrl: './shoppingcart.component.css'
})
export class ShoppingcartComponent implements OnInit {
  cartItems: CartItem[] = [];
  summary: number = 0;
  discount: number = 0;
  quantityOptions: number[] = Array.from({ length: 10 }, (_, i) => i + 1);

  constructor(private formatterService: FormatterService, private cartService: CartService){}

  ngOnInit(): void {
    this.cartItems = this.cartService.getCartItems();
    this.summary = this.cartService.getSummaryPrice();
  }

  removeFromCart(itemId: string){
    this.cartService.removeItem(itemId);

    this.ngOnInit();
  }

  incrementQuantity(item: CartItem | undefined){
    if (item && ! (item.quantity + 1 > item.available)) {
      this.updateQuantity(item, item.quantity + 1);
    }
  }

  decrementQuantity(item: CartItem | undefined){
    if (item) {
      this.updateQuantity(item, item.quantity - 1);
    }
  }

  updateQuantity(item: CartItem | undefined, quantity: number){
    if(item){
      this.cartService.changeQuantity(item.id, quantity);

    this.ngOnInit();
    }
  }

  formatPrice(price: number): string {
    return this.formatterService.formatPrice(price);
  }

}
