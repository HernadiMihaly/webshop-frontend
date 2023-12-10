import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './component/product-list/product-list.component';
import { MainComponent } from './component/main/main.component';

const routes: Routes = [
  { path: '', component: MainComponent 
  },
  { path: 'products/men', component: ProductListComponent 
  },
  { path: 'products/women', component: ProductListComponent 
  },
  { path: 'products/children', component: ProductListComponent 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
