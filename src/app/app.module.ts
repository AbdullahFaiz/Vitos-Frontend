import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CartComponent } from './cart/cart.component';
import { CartService } from './cart/cart.service';
import { LocalStorageService } from './common/local-storage/local-storage.service';
import { CustomerLoginComponent } from './customer-login/customer-login.component';
import { CustomerLoginService } from './customer-login/customer-login.service';
import { LandingComponent } from './landing/landing.component';
import { LandingService } from './landing/landing.service';

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    CartComponent,
    CustomerLoginComponent
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
    LandingService,
    CustomerLoginService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
