import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { ProductService } from '../core/service/impl/product.service';
import { ProductServiceApi } from '../core/service/product-service.api';
import { MaterialModule } from '../material/material.module';
import { environment } from './../../environments/environment';
import { ProductServiceMock } from './../core/service/mock/product-service.mock';
import { HomeComponent } from './home/home.component';
import { PagesRoutingModule } from './pages-routing.module';
import { PagesComponent } from './pages.component';
import { ProductComponent } from './product/product.component';
import { AllProductEffects } from './store/actions/effects/all-product.effects';
import { CreateProductEffects } from './store/actions/effects/create-product.effects';
import { DeleteProductEffects } from './store/actions/effects/delete-product.effects';
import * as fromAllProduct from './store/actions/reducers/all-product.reducer';

@NgModule({
  declarations: [PagesComponent, HomeComponent, ProductComponent],
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
    ]),
  ],
  providers: [
    {
      provide: ProductServiceApi,
      useClass: !environment ? ProductService : ProductService,
    },
  ],
})
export class PagesModule {}
