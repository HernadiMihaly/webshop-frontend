import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './component/product_component/product-list/product-list.component';
import { MainComponent } from './component/main_component/main/main.component';
import { ProductPageComponent } from './component/product_component/product-page/product-page.component';
import { ShoppingcartComponent as ShoppingCartComponent } from './component/shoppingcart_component/shoppingcart/shoppingcart.component';
import { RegisterComponent } from './component/register_component/register/register.component';

const routes: Routes = [
  { path: '', component: MainComponent 
  },
  { path: 'products/:categoryId', component: ProductListComponent
  },
  { path: 'product/:id', component: ProductPageComponent 
  },
  { path: 'products', component: ProductListComponent 
  },
  { path: 'info/products', component: MainComponent 
  },
  { path: 'cart', component: ShoppingCartComponent
  },
  { path: 'register', component: RegisterComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
