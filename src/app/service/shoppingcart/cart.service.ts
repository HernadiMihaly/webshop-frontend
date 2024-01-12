import { Injectable, Optional, SkipSelf } from '@angular/core';
import { CartItem } from './cartitem';
import { BehaviorSubject, startWith } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private items: CartItem[] = []
  private cartSubject: BehaviorSubject<number> = new BehaviorSubject<number>(this.getCartQuantity());
  cart$ = this.cartSubject.asObservable();

  constructor(@Optional() @SkipSelf() cartService?: CartService) { }

  addItem(item: CartItem) {
    if (item.quantity > 0) {
      const itemIndex = this.items.findIndex(i => i.id === item.id);

      if (itemIndex !== -1) {
        if ((this.items[itemIndex].quantity + item.quantity) <= item.available) {
          this.items[itemIndex].quantity += item.quantity;
        }
      } else {
        if (item.quantity <= item.available) {
          this.items.push(item);
        }
      }

      this.saveCart();
      this.updateCart();
    }
  }

  removeItem(id: string) {
    this.items = this.items.filter(i => i.id !== id);

    this.saveCart();
    this.updateCart();
  }

  changeQuantity(id: string, quantity: number) {
    if (quantity <= 0) {
      this.removeItem(id);
    } else {
      const foundItem = this.items.find(i => i.id === id);

      if (foundItem) {
        foundItem.quantity = Math.min(quantity, foundItem.available);
      }

      this.saveCart();
      this.updateCart();
    }
  }

  saveCart(): void {
    const itemsJson = JSON.stringify(this.items);

    localStorage.setItem('cart_items', itemsJson);
  }

  loadCart(): void {
    const storedItems = localStorage.getItem('cart_items');

    if (storedItems) {
      try {
        this.items = JSON.parse(storedItems);
      } catch (error) {
        console.error('Hiba a kosár betöltésekor:', error);
      }
    }
  }

  storeCartQuantity() {
    const totalQuantity = this.getCartQuantity();
    this.cartSubject.next(totalQuantity);
  }

  getCartItems(): CartItem[] {
    const storedItems = localStorage.getItem('cart_items');

    if (storedItems) {
      const cartItems: CartItem[] = JSON.parse(storedItems);

      return cartItems;
    }

    return [];
  }

  getSummaryPrice(): number {
    let sum = 0;

    this.items.forEach(item => sum += (item.price * item.quantity))

    return sum;
  }

  getCartQuantity(): number {
    let sum = 0;

    this.items.forEach(item => sum += item.quantity)

    return sum;

  }

  public updateCart() {
    const totalQuantity = this.getCartQuantity();
    this.cartSubject.next(totalQuantity);
    this.saveCart();
  }

}
