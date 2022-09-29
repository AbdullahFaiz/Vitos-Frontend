import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { interval, Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { CartService } from './cart/cart.service';
import { LocalStorageService } from './common/local-storage/local-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'vitos';

  constructor(
    private localStorageService: LocalStorageService,
    private cartService: CartService,
    private router: Router
    ) {}


  url = window.location.pathname; 
  cartItemsCount = 0;
  cartItemTotal = 0;

  subscription: Subscription;
  subscribeEmail = null;
  customerDetails = null;
  ngOnInit() {
    this.testSubscription();
    console.log("window.location.pathname");
    const source = interval(2000);
    this.getCartDetails();
    this.subscription = source.subscribe(val => this.testSubscription());

    console.log(window.location.pathname);
  }

  ngOnDestroy() {
    // For method 1
    this.subscription && this.subscription.unsubscribe();

  }
  
  checkNav(path){
    this.url = path;
  }
  toggleNav(path){

    console.log(path);
    this.customerDetails = this.localStorageService.getData();
    
    if(path=="/login" || path=="/landing" || path=="/"){
      this.router.navigate([path])
    }else{
      if(this.customerDetails != null){
        this.router.navigate([path]) 
      }else{
        Swal.fire(
          'Not Logged',
          'Login into make order',
          'warning'
        )
      }
    }
  }

  getCartDetails(){
    
    let pizzas = [
      {
        "pizzaId"   : 1,
        "description" : "apple",
        "quantity"    : 3,
        "unitPrice" : 130,
      },
      {
        "pizzaId"   : 2,
        "description" : "orange",
        "quantity"    : 1,
        "unitPrice" : 110,
      },
      {
        "pizzaId"   : 3,
        "description" : "graped",
        "quantity"    : 2.33,
        "unitPrice" : 900,
      },
      {
        "pizzaId"   : 4,
        "description" : "rice",
        "quantity"    : 10,
        "unitPrice" : 130,
      }
    ];
    let cartDetails = {
      "pizzas"  : pizzas
    };
    
    this.cartItemsCount = pizzas.length;
  }

  testSubscription(){

    this.checkLogin();

    this.checkNav(window.location.pathname);
    let cartDT = this.cartService.getCartData();
    this.cartItemsCount = Math.floor(Math.random() * 9) + 1;
    if(cartDT != null){
      this.cartItemsCount = cartDT.length;
      this.cartItemTotal = 0;
      for(let item of cartDT){
        // console.log(Number(item["quantity"]));
        // console.log(Number(item["unitPrice"]));
        // console.log(item["quantity"]);
        // console.log(item["unitPrice"]);
        this.cartItemTotal +=  Number(item["unitPrice"]);
      }
    }else{

      this.cartItemsCount = 0;
      this.cartItemTotal = 0;
    }
  }
  resetCustomerCart(){
    this.localStorageService.setData(null);
    this.cartService.setCartData(null);
  }
  checkLogin(){
    this.customerDetails = this.localStorageService.getData();
    

  }
}
