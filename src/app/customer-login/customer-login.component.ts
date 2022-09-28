import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NbComponentStatus, NbGlobalPhysicalPosition, NbGlobalPosition, NbToastrConfig, NbToastrService } from '@nebular/theme';
import { LocalDataSource } from 'ng2-smart-table';
import swal from 'sweetalert2';
import { SmartTableData } from '../../@core/data/smart-table';
import { LocalStorageService } from '../../common/local-storage/local-storage.service';
import { CartService } from '../cart/cart.service';
import { CheckoutService } from '../checkout/checkout.service';
import { CustomerLoginService } from './customer-login.service';

@Component({
  selector: 'ngx-customer-login',
  templateUrl: './customer-login.component.html',
  styleUrls: ['./customer-login.component.scss'],
})

export class CustomerLoginComponent {
  
  @ViewChild('f') signin: NgForm;

  loading   : boolean = false; //loading
  userAlert : any;
  loginForm : FormGroup;
  menuList : any = [];

  usernameNotFound = false;
  passwordIncorrect = false;
  inactiveLogin = false;

  userExist   : boolean = false; //userExist
  passwordInvalid : boolean = false; //passwordInvalid
  customerForm : FormGroup;

  disabledForm = false;

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
  constructor(
    private customerLoginService: CustomerLoginService,
    private localStorageService: LocalStorageService,
    private router: Router,
    private checkoutService: CheckoutService,
    private cartService: CartService,
    private toastrService: NbToastrService) {}

    // Toaster 
  config: NbToastrConfig;

  index = 1;
  destroyByClick = true;
  duration = 2000;
  hasIcon = true;
  position: NbGlobalPosition = NbGlobalPhysicalPosition.TOP_RIGHT;
  preventDuplicates = false;
  status: NbComponentStatus = 'primary';

  private showToast(type: NbComponentStatus, title: string, body: string) {
    const config = {
      status: type,
      destroyByClick: this.destroyByClick,
      duration: this.duration,
      hasIcon: this.hasIcon,
      position: this.position,
      preventDuplicates: this.preventDuplicates,
    };
    const titleContent = title ? `. ${title}` : '';

    this.index += 1;
    this.toastrService.show(
      body,
      `${titleContent}`,
      config);
  }


  ngOnInit() {
    this.initForm();
  }

  

  //alert set
  setAlert(alertStatus:String, alertMessage:String): void{
    this.userAlert = {
      status : alertStatus,
      message : alertMessage
    }
  }


  //Initialize the Add Form
  private initForm(){
    this.customerForm = new FormGroup({
      'firstName'  : new FormControl(null, Validators.required),
      'lastName'  : new FormControl(null, Validators.required),
      'address'  : new FormControl(null, Validators.required),
      'houseNo'  : new FormControl(null, Validators.required),
      'town'  : new FormControl(null, Validators.required),
      'nic'  : new FormControl(null, Validators.required),
      'contactNo'  : new FormControl(null, Validators.required),
      'email'  : new FormControl(null, Validators.required),
      'password'  : new FormControl(null, Validators.required)
    });
  }

  checkCustomerByEmail(){
    // console.log(categoryId);
    // this.loading = true;

    console.log("1111this.userExist");
    console.log(this.userExist);
    console.log("1111this.userExist");
      this.checkoutService.checkCustomerByEmail(this.UserNameEmail).subscribe((response) => {
       
        setTimeout(() => { this.loading = false; }, 1500);
        let resp  = response["customer"];
        if(response["code"] == 200){
          this.userExist = true;
          console.log("Success");
          // this.showToast("success", "Found User", "User Registration Found!");

        }else{
          console.log("User Not Found");
          // this.showToast("success", "User Not Found", "Please Register as New User!");

          this.userExist = false;

        }



        console.log("this.userExist");
        console.log(this.userExist);
        console.log("this.userExist");
      });
    
  }
  
  //add new
  loginSubmit(){

    if(this.password != "" && this.userExist){
      this.loading = true;//loading
      let customerData = {
        'username'  : this.UserNameEmail,
        'password'  : this.password
      }
      this.checkoutService.authenticate(customerData).subscribe((response) => {
        console.log(response);
        if(response['code'] === 200){//success
          // this.localStorageService.setToken(response['token']);//store token
          // this.showToast("warning", "User Credential Valid", "Login Credentials are Valid!");

          this.localStorageService.setData(response['customer'][0]);
          this.customerDetails = this.localStorageService.getData();
          this.disabledForm = true;
          console.log("his.localStorageService.setData(response['customer'][0]);");

          let redirectUrl = '/shop/landing';
          console.log("Router");
          setTimeout(() => { this.router.navigate([redirectUrl]) }, 1000);

        }else if(response['code'] ==407){//error
         this.usernameNotFound=true;
          swal("Login Error!", "Invalid Username", "warning");
          this.showToast("warning", "Invalid Username", "Login Credentials are Invalid!");



        }else if(response['code'] ==408){//error
          this.passwordIncorrect=true;
           swal("Login Error!", "Invalid Username", "warning");
           this.showToast("warning", "Invalid Password", "Login Credentials are Invalid!");
 
 
        }else if(response['code'] ==403){//error
          // this.inactiveLogin=true;
          swal("Login Error!", "Your Account has not been activated yet.", "warning");
          this.showToast("warning", "Your Account has not been activated yet.", "Login Error!");


        }else if(response['code'] ==409){//error
         
          // swal("Reset Password!", "First Login Reset Password", "success");
          // let authData ={
          //   'username': this.loginForm.get('username').value
          // }

          // this.localStorageService.setData(authData);
          // setTimeout(() => { this.router.navigate(['/backoffice/auth/reset-password']) }, 500);


        }else{//error
          
          swal("Error!", response['message'], "error");

        }
      });
    }else{
      // swal("Login Error!", "Please fill required fields!", "warning");

     
    }
  }

  changeView(view,data){
    this.view = view
    if(view == "add"){

    }else if (view == "edit"){

    }else{

    }
  }

  
}
