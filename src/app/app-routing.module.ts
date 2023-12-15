import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './component/product_component/product-list/product-list.component';
import { MainComponent } from './component/main_component/main/main.component';
import { ProductPageComponent } from './component/product_component/product-page/product-page.component';

const routes: Routes = [
  { path: '', component: MainComponent 
  },
  { path: 'products/men', component: ProductListComponent 
  },
  { path: 'products/women', component: ProductListComponent 
  },
  { path: 'products/children', component: ProductListComponent 
  },
  { path: 'product/:id', component: ProductPageComponent 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
