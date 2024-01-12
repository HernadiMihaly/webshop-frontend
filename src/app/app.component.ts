import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CartService } from './service/shoppingcart/cart.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {

  constructor(private modalService: NgbModal, private cartService: CartService) {
    if (typeof localStorage !== 'undefined') {
      cartService.loadCart();
      cartService.storeCartQuantity();
    }
  }

  public open(modal: any): void {
    this.modalService.open(modal);
  }

}
