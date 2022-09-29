import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import swal from 'sweetalert2';
import { CartService } from '../cart/cart.service';
import { CheckoutService } from './checkout.service';
import { contactNo, emailValidator, lankanNicValidator, nameValidator } from '../common/customRegex';
import { LocalStorageService } from '../common/local-storage/local-storage.service';

declare var payhere: any;

@Component({
  selector: 'ngx-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})

export class CheckoutComponent {
  
  @ViewChild('f') signin: NgForm;

  loading   : boolean = false; //loading
  userExist   : boolean = false; //userExist
  passwordInvalid : boolean = false; //passwordInvalid
  userAlert : any;
  customerForm : FormGroup;
  menuList : any = [];

  usernameNotFound = false;
  passwordIncorrect = false;
  inactiveLogin = false;

  userlogged = false;
  paymentMthd = "COD";
  cartDetails = [];
  customerDetails = [];
  productList= [];
  subTotal = 0;
  total = 0;
  localStorageDetails = [];
  UserNameEmail = '';
  password = '';
  registrationView = true;
  view : String = "default";


  refernceNo = null;
  paymentStatus = null;
  
  constructor(
    private checkoutService: CheckoutService,
    private cartService: CartService,
    private localStorageService: LocalStorageService,
    private router: Router) {
    }

 

  



  ngOnInit() {
    
    this.initForm();
    this.cartDetails = this.cartService.getCartData();
    this.customerDetails = this.localStorageService.getData();
    if(this.customerDetails != null){
      this.userlogged = true;
      this.registrationView = false;
    }
    console.log(this.customerDetails);
    this.updateCart(); 
  }

  
  toggleregistrationView(){
    this.registrationView = !this.registrationView;
  }
  updateCart(){
    this.cartService.setCartData(this.cartDetails);
    this.subTotal = 0;
    this.total = 0;
    for(let item of this.cartDetails){
      console.log(Number(item["quantity"]));
      // console.log(Number(item["unitPrice"]));
      // console.log(item["quantity"]);
      // console.log(item["unitPrice"]);
      this.subTotal += (Number(item["quantity"]) * Number(item["unitPrice"]));
      this.total += (Number(item["quantity"]) * Number(item["unitPrice"]));
    }
  }

  //Initialize the Add Form
  private initForm(){
    this.customerForm = new FormGroup({
      'firstName'  : new FormControl(null, [Validators.required,nameValidator]),
      'lastName'  : new FormControl(null, [Validators.required,nameValidator]),
      'address'  : new FormControl(null, [Validators.required]),
      'houseNo'  : new FormControl(null, [Validators.required]),
      'town'  : new FormControl(null, [Validators.required]),
      'nic'  : new FormControl(null, [Validators.required,lankanNicValidator]),
      'contactNo'  : new FormControl(null, [Validators.required,contactNo]),
      'email'  : new FormControl(null, [Validators.required,emailValidator]),
      'password'  : new FormControl(null, [Validators.required]),
      'confirmEmail'  : new FormControl(null, [Validators.required,emailValidator]),
      'confirmPassword'  : new FormControl(null, [Validators.required]),
      'pymtMTHD'  : new FormControl("COD")
    });
  }

  
  checkLogin(){
    
    this.customerDetails = this.localStorageService.getData();
    if(this.customerDetails != null){
      this.userlogged = true;
    }
    console.log(this.customerDetails);
  }

  
}
