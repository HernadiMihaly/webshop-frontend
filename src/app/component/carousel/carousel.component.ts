// carousel.component.ts

import { Component, SecurityContext } from '@angular/core';
import { CarouselConfig } from 'ngx-bootstrap/carousel';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css'],
  providers: [{ provide: CarouselConfig, useValue: { interval: 3000, noPause: false } }]
})
export class CarouselComponent {
  slides = [
    { image: '../../../assets/images/women.jpg', text: 'női kollekció', link: '/products/women' },
    { image: '../../../assets/images/men.jpg', text: 'férfi kollekció', link: '/products/men' },
    { image: '../../../assets/images/children.jpg', text: 'gyerek kollekció', link: '/products/children' }
  ];

  constructor(private sanitizer: DomSanitizer) {}

  splitText(text: string): string[] {
    return text.split(' ');
  }
}
