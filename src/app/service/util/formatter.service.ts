import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FormatterService {

  constructor() { }

  formatPrice(price: number): string{
    let priceString = price.toString();

    let tempLength = priceString.length;
    let i = Math.floor(tempLength / 3);

    while (i > 0 && tempLength > 3) {
        tempLength -= 3;
        priceString = priceString.slice(0, tempLength) + ' ' + priceString.slice(tempLength);
        i--;
    }

    return priceString;
  }
}
