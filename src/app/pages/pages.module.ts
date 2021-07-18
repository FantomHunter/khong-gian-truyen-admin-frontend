import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { CategoryServiceApi } from '../core/service/category-service.api';
import { ProductService } from '../core/service/impl/product.service';
import { CategoryServiceMock } from '../core/service/mock/category-service.mock';
import { ProductServiceApi } from '../core/service/product-service.api';
import { MaterialModule } from '../material/material.module';
import { environment } from './../../environments/environment';
import { ProductServiceMock } from './../core/service/mock/product-service.mock';
import { CategoryComponent } from './category/category.component';
import { HomeComponent } from './home/home.component';
import { PagesRoutingModule } from './pages-routing.module';
import { PagesComponent } from './pages.component';
import { ProductComponent } from './product/product.component';
import { AllProductEffects } from './store/effects/all-product.effects';
import { CreateProductEffects } from './store/effects/create-product.effects';
import { DeleteProductEffects } from './store/effects/delete-product.effects';
import { UpdateProductEffects } from './store/effects/update-product.effects';
import * as fromAllProduct from './store/reducers/all-product.reducer';
import * as fromAllCategory from './store/reducers/all-category.reducer';
import { AllCategoryEffects } from './store/effects/all-category.effects';
import { CreateCategoryEffects } from './store/effects/create-category.effects';

@NgModule({
  declarations: [
    PagesComponent,
    HomeComponent,
    ProductComponent,
    CategoryComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    PagesRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forFeature(
      fromAllProduct.allProductFeatureKey,
      fromAllProduct.reducer
    ),
    EffectsModule.forFeature([
      AllProductEffects,
      CreateProductEffects,
      DeleteProductEffects,
      UpdateProductEffects,
      AllCategoryEffects,
      CreateCategoryEffects,
    ]),
    StoreModule.forFeature(fromAllCategory.allCategoryFeatureKey, fromAllCategory.reducer),
    StoreModule.forFeature(fromAllCategory.allCategoryFeatureKey, fromAllCategory.reducer),
  ],
  providers: [
    {
      provide: ProductServiceApi,
      useClass: !environment.production ? ProductServiceMock : ProductService,
    },
    {
      provide: CategoryServiceApi,
      useClass: !environment.production
        ? CategoryServiceMock
        : CategoryServiceMock,
    },
  ],
})
export class PagesModule {}
