import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { LocalStorageService } from '../common/local-storage/local-storage.service';

import { CartService } from './cart.service';

@Component({
  selector: 'ngx-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})

export class CartComponent {
  
  @ViewChild('f') signin: NgForm;

  loading   : boolean = false; //loading

  userDetails = [];
  cartDetails = [];
  view : String = "default";
  subTotal = 0;
  total = 0;
  userlogged = false;
  constructor(
    private cartService: CartService,
    private localStorageService: LocalStorageService,
    private router: Router) {}

  
  ngOnInit() {
    
    this.cartDetails = this.cartService.getCartData();
    this.updateCart();     
    this.userDetails = this.localStorageService.getData();
    if(this.userDetails != null){
      this.userlogged = true;
    }else{

      Swal.fire("User not logged!","Please login to proceed", "warning");
      setTimeout(() => { this.router.navigate(["/landing"]) }, 1000);
    }
    console.log(this.userDetails);
  }
  

 
  clearItem(item){
    const index = this.cartDetails.indexOf(item, 0);
    if (index > -1) {
      this.cartDetails.splice(index, 1);
      
    }
    this.updateCart();     
  }

  updateCart(){
    if(this.cartDetails != null){
      this.cartService.setCartData(this.cartDetails);
      this.subTotal = 0;
      this.total = 0;
      for(let item of this.cartDetails){
        this.subTotal += (Number(item["unitPrice"]));
        this.total += (Number(item["unitPrice"]));
      }
    }
  }
  
  createOrder(){
    this.loading = true;
    let data : object;
    
    
    if(this.userDetails != null && this.cartDetails != null){

      let pizzas = [];

      for(let x of this.cartDetails){
        let pizzaItem = {
          "pizzaId": x.pizzaId,
          "quantity": x.quantity,
        }

        pizzas.push(pizzaItem);
      }
      data = {
        'user'      : {"userId" : this.userDetails["userId"]},
        'pizza'       : pizzas,
        'totalBill'     : this.total,
      }

      console.log(data);
      
      this.cartService.createOrder(data).subscribe((response) => {
        setTimeout(() => { this.loading = false; }, 4000);
        
        if(response['code'] == '401'){//validation error
          response["validationErrors"].forEach( (currentValue, index) => {
            Swal.fire("Validation Error !",currentValue.message, "warning");
          });

        }else if(response['code'] == '200'){         
          Swal.fire("Successful !","You order creation success", "success");
          
          let emptyCartDetails = [];
          this.cartService.setCartData(emptyCartDetails);
          let redirectUrl = '/landing';
          console.log("Router");
          setTimeout(() => { this.router.navigate([redirectUrl]) }, 1000);
          
        }else{
          Swal.fire("Unsuccessful !","You order creation failed", "warning");
        }
      });
      setTimeout(() => { this.loading = false; }, 1500);

    }else{
      this.loading = false;
      Swal.fire("Cart Empty","Add pizza to cart to proceed", "warning");


    }
  }
  

  
}
