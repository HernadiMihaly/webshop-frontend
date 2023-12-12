import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from "../app/component/navbar/navbar.component";
import { ProductListComponent } from "../app/component/product-list/product-list.component";
import { CarouselComponent } from './component/carousel/carousel.component';
import { MainComponent } from './component/main/main.component';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { SubscribePanelComponent } from './component/subscribe-panel/subscribe-panel.component';
import { PopularItemsListComponent } from './component/popular-items-list/popular-items-list.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    MainComponent,
    ProductListComponent,
    CarouselComponent,
    SubscribePanelComponent,
    PopularItemsListComponent
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
