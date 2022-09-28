import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CartService } from './cart/cart.service';
import { CheckoutService } from './checkout/checkout.service';
import { LocalStorageService } from './common/local-storage/local-storage.service';
import { LandingComponent } from './landing/landing.component';
import { LandingService } from './landing/landing.service';

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    LocalStorageService,
    CartService,
    CheckoutService,
    LandingService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
