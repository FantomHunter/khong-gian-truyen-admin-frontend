import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryComponent } from './category/category.component';
import { HomeComponent } from './home/home.component';
import { PagesComponent } from './pages.component';
import { ProductComponent } from './product/product.component';

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      { path: '',   redirectTo: '/home', pathMatch: 'full' },
      {
        path: 'home',
        component: HomeComponent,
      },
      {
        path: 'product',
        component: ProductComponent,
      },
      {
        path: 'category',
        component: CategoryComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
