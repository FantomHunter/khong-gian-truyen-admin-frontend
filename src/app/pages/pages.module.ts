import { ProductServiceMock } from './../core/service/mock/product-service.mock';
import { environment } from './../../environments/environment';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductServiceApi } from '../core/service/product-service.api';
import { MaterialModule } from '../material/material.module';
import { HomeComponent } from './home/home.component';
import { PagesRoutingModule } from './pages-routing.module';
import { PagesComponent } from './pages.component';
import { ProductComponent } from './product/product.component';
import { StoreModule } from '@ngrx/store';
import * as fromAllProduct from './store/actions/reducers/all-product.reducer';
import { EffectsModule } from '@ngrx/effects';
import { AllProductEffects } from './store/actions/effects/all-product.effects';
import { CreateProductEffects } from './store/actions/effects/create-product.effects';

@NgModule({
  declarations: [PagesComponent, HomeComponent, ProductComponent],
  imports: [
    CommonModule,
    PagesRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forFeature(fromAllProduct.allProductFeatureKey, fromAllProduct.reducer),
    EffectsModule.forFeature([AllProductEffects, CreateProductEffects]),
  ],
  providers: [
    {
      provide: ProductServiceApi,
      useClass: !environment ? ProductServiceMock : ProductServiceMock,
    },
  ],
})
export class PagesModule {}
