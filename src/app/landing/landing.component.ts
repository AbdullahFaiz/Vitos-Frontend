import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import swal from 'sweetalert2';
import { CartService } from '../cart/cart.service';
import { LandingService } from './landing.service';
import { LocalStorageService } from '../common/local-storage/local-storage.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LandingComponent implements OnInit {
  
  loading   : boolean = false; //loading
  pizzaList = [];
  tempPizzaList = [];
  customerDetails = null;


  constructor(
    private localStorageService: LocalStorageService,
    private cartService: CartService,
    private landingService: LandingService,
    private router: Router,) {}

  ngOnInit() {
    this.checkLogin();
    this.getPizzaByCategory();
  }

 

  getUrl(url){
    return "url("+url+")";
  }
  




  //get all PizzaByCategory
  getPizzaByCategory(){
    this.loading = true;
    this.landingService.getAllPizzaByCategory().subscribe((response) => {
      this.pizzaList  = [];
      this.tempPizzaList  = [];

      setTimeout(() => { this.loading = false; }, 1500);
      this.pizzaList  = response["responseData"];
      this.tempPizzaList  = response["responseData"];
      console.log("response");
      console.log(response);
      console.log("response");

      console.log("this.pizzaList");
      console.log(this.pizzaList);
      console.log("this.pizzaList");

    })
  }

  checkLogin(){
    // console.log(this.customerDetails);

    this.customerDetails = this.localStorageService.getData();
    if(this.customerDetails != null){
      console.log(this.customerDetails);

    }

  }
  

  updateCart(pizza){
    this.customerDetails = this.localStorageService.getData();
    if(this.customerDetails != null){

      let cartDT = this.cartService.getCartData();
      
      if(pizza.quantity >= 1){
        let prdt = {
          "pizzaId"   : pizza.pizzaId,
          "description" : pizza.description,
          "quantity"    : pizza.quantity,
          "unitPrice"   : pizza.unitPrice,
          "image"       : pizza.imgURL,
        };
        if(cartDT==null){
          cartDT = [prdt]
        }else{
          cartDT.push(prdt);
        }
        this.cartService.setCartData(cartDT);
        console.log("cartDT - final pizzaList");
        console.log(cartDT);
        
        swal.fire("Pizza added to cart","", "success");

      }else{
        
        swal.fire("Not Available !","Your quantity exceeds more than availabe", "warning");
      }
    }else{
      swal.fire("Not Logged !","Please login to add pizza to cart", "warning");

    }
  }
  
}
