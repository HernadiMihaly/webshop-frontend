import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from "./component/main_component/navbar/navbar.component";
import { ProductListComponent } from "./component/product_component/product-list/product-list.component";
import { CarouselComponent } from './component/main_component/carousel/carousel.component';
import { MainComponent } from './component/main_component/main/main.component';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { SubscribePanelComponent } from './component/main_component/subscribe-panel/subscribe-panel.component';
import { PopularItemsListComponent } from './component/main_component/popular-items-list/popular-items-list.component';
import { FooterComponent } from './component/main_component/footer/footer.component';
import { ProductPageComponent } from './component/product_component/product-page/product-page.component';
import { HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CartService } from './service/shoppingcart/cart.service';
import { ShoppingcartComponent } from './component/shoppingcart_component/shoppingcart/shoppingcart.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    MainComponent,
    ProductListComponent,
    CarouselComponent,
    SubscribePanelComponent,
    PopularItemsListComponent,
    FooterComponent,
    ProductPageComponent,
    ShoppingcartComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    AppRoutingModule,
    HttpClientModule,
    CarouselModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ],
  providers: [
    provideHttpClient(withFetch()),
    provideClientHydration(),
    CartService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

}
