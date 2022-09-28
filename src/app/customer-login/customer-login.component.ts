import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { CartService } from '../cart/cart.service';
import { CheckoutService } from '../checkout/checkout.service';
import { LocalStorageService } from '../common/local-storage/local-storage.service';
import { CustomerLoginService } from './customer-login.service';

@Component({
  selector: 'ngx-customer-login',
  templateUrl: './customer-login.component.html',
  styleUrls: ['./customer-login.component.scss'],
})

export class CustomerLoginComponent {
  
  // @ViewChild('f') signin: NgForm;


  usernameNotFound = false;
  passwordIncorrect = false;
  inactiveLogin = false;

  userlogged = false;
  userExist   : boolean = false; //userExist
  passwordInvalid : boolean = false; //passwordInvalid
  customerForm : FormGroup;

  disabledForm = false;

  customerDetails = [];
  localStorageDetails = [];
  contactNo = '';
  password = '';
  constructor(
    private customerLoginService: CustomerLoginService,
    private localStorageService: LocalStorageService,
    private router: Router,
    private checkoutService: CheckoutService,
    private cartService: CartService,
    
    ) {}


  ngOnInit() {
    this.initForm();
  }

  onclickLoggedUser(){
    this.userlogged = !this.userlogged;
  }

  

  //Initialize the Register Customer Form
  private initForm(){
    this.customerForm = new FormGroup({
      'name'  : new FormControl(null, Validators.required),
      'address'  : new FormControl(null, Validators.required),
      'dob'  : new FormControl(null, Validators.required),
      'contactNo'  : new FormControl(null, Validators.required),
      'email'  : new FormControl(null, Validators.required),
      'password'  : new FormControl(null, Validators.required)
    });
  }

  
  
  
  loginSubmit(){

    if(this.password != null && this.contactNo != null){
      let customerData = {
        'contactNo'  : this.contactNo,
        'password'  : this.password
      }
      this.customerLoginService.authenticate(customerData).subscribe((response) => {
        console.log(response);
        if(response['code'] === 200){//success

          console.log("response");
          console.log(response);
          console.log(response['user']);
          this.localStorageService.setData(response['user']);
          this.customerDetails = this.localStorageService.getData();
          this.disabledForm = true;
          console.log("his.localStorageService.setData(response['customer'][0]);");

          let redirectUrl = '/';
          console.log("Router");
          setTimeout(() => { this.router.navigate([redirectUrl]) }, 1000);
          Swal.fire(
            'Success',
            '',
            'success'
          )
        }else if(response['code'] ==407){//error
         this.usernameNotFound=true;
          Swal.fire(
            'Invalid Username',
            '',
            'warning'
          )


        }else if(response['code'] ==408){//error
          this.passwordIncorrect=true;
          Swal.fire(
            'Incorrect',
            '',
            'warning'
          )
 
        }else{//error
          
          Swal.fire(
            'Error',
            response['message'],
            'error'
          )

        }
      });
    }else{

      Swal.fire(
        'Login Error!',
        'Please fill required fields!',
        'warning'
      )
    }
  }

  //Register Customer
  registerCustomer(){

    if(this.customerForm.value.name != null && this.customerForm.value.password != null && this.customerForm.value.contactNo != null &&this.customerForm.value.email != null &&this.customerForm.value.address != null){
      
      let customerData = {
        'name'  : this.customerForm.value.name,
        'password'  : this.customerForm.value.password,
        'contactNo'  : this.customerForm.value.contactNo,
        'dob'  : this.customerForm.value.dob,
        'email'  : this.customerForm.value.email,
        'address'  : this.customerForm.value.address
      }
      console.log("this.customerForm");
      console.log(this.customerForm);
      this.customerLoginService.register(customerData).subscribe((response) => {
        console.log(response);
        if(response['code'] === 200){//success
          Swal.fire(
            'Success',
            '',
            'warning'
          )

          this.localStorageService.setData(response['user']);
          this.customerDetails = this.localStorageService.getData();
          this.disabledForm = true;
          console.log("his.localStorageService.setData(response['customer'][0]);");

          let redirectUrl = '/';
          console.log("Router");
          setTimeout(() => { this.router.navigate([redirectUrl]) }, 1000);

        }else{//error
          
          Swal.fire(
            'Error!',
            response['message'],
            'error'
          )

        }
      });
    }else{
      Swal.fire(
        'Registration Error!',
        'Please fill required fields!',
        'warning'
      )

     
    }
  }

  

  
}
