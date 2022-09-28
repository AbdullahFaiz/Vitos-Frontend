import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
// import { NbComponentStatus, NbGlobalPhysicalPosition, NbGlobalPosition, NbToastrConfig, NbToastrService } from '@nebular/theme';
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
  customerDetailsForm: FormGroup;

  cartDetails = [];
  view : String = "default";
  subTotal = 0;
  total = 0;

  constructor(
    private cartService: CartService,
    private localStorageService: LocalStorageService,) {}

  
  ngOnInit() {
    this.initForm();
    
    this.cartDetails = this.cartService.getCartData();
    this.updateCart();     

  }
  

  //Initialize the Add Form
  private initForm(){
    

    this.customerDetailsForm =  new FormGroup({
      'fullName'  : new FormControl(null, Validators.required),
      'address'  : new FormControl(null, Validators.required),
      'city'  : new FormControl(null, Validators.required),
      'postCode'  : new FormControl(null, Validators.required),
      'contactNumber'  : new FormControl(null, Validators.required),
      'email'  : new FormControl(null, Validators.required),
      'emailRepeat'  : new FormControl(null, Validators.required),
      'password'  : new FormControl(null, Validators.required)

    });
  }

  onCustomerSubmit(){
    
  }

 
  clearItem(item){
    const index = this.cartDetails.indexOf(item, 0);
    if (index > -1) {
      this.cartDetails.splice(index, 1);
      
    }
    this.updateCart();     
  }

  updateCart(){
    this.cartService.setCartData(this.cartDetails);
    this.subTotal = 0;
    this.total = 0;
    for(let item of this.cartDetails){
      // console.log(Number(item["cartQuantity"]));
      // console.log(Number(item["unitPrice"]));
      // console.log(item["quantity"]);
      // console.log(item["unitPrice"]);
      this.subTotal += (Number(item["unitPrice"]));
      this.total += (Number(item["unitPrice"]));
    }
  }
  
  

  
}
