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


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    MainComponent,
    ProductListComponent,
    CarouselComponent,
    SubscribePanelComponent,
    PopularItemsListComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    AppRoutingModule,
    CarouselModule.forRoot()
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
