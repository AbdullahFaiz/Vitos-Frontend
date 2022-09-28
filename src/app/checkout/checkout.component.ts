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

  disabledForm = false;
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
      // payhere.init();
      // console.log(payhere);
    }

  //   // Toaster 
  // config: NbToastrConfig;

  // index = 1;
  // destroyByClick = true;
  // duration = 2000;
  // hasIcon = true;
  // position: NbGlobalPosition = NbGlobalPhysicalPosition.TOP_RIGHT;
  // preventDuplicates = false;
  // status: NbComponentStatus = 'primary';

  // private showToast(type: NbComponentStatus, title: string, body: string) {
  //   const config = {
  //     status: type,
  //     destroyByClick: this.destroyByClick,
  //     duration: this.duration,
  //     hasIcon: this.hasIcon,
  //     position: this.position,
  //     preventDuplicates: this.preventDuplicates,
  //   };
  //   const titleContent = title ? `. ${title}` : '';

  //   this.index += 1;
  //   this.toastrService.show(
  //     body,
  //     `${titleContent}`,
  //     config);
  // }


  



  ngOnInit() {
    // console.log(payhere);
    // Called when user completed the payment. It can be a successful payment or failure
    payhere.onCompleted = function onCompleted(orderId) {
      console.log("Payment completed. OrderID:" + orderId);
      //Note: validate the payment and show success or failure page to the customer
    };

    // Called when user closes the payment without completing
    payhere.onDismissed = function onDismissed() {
        //Note: Prompt user to pay again or show an error page
        console.log("Payment dismissed");
    };

    // Called when error happens when initializing payment such as invalid parameters
    payhere.onError = function onError(error) {
        // Note: show an error page
        console.log("Error:" + error);
    };

    this.initForm();
    this.cartDetails = this.cartService.getCartData();
    this.customerDetails = this.localStorageService.getData();
    if(this.customerDetails != null){
      this.disabledForm = true;
      this.registrationView = false;
    }
    console.log(this.customerDetails);
    this.updateCart(); 
  }

  callCheckout(orderId,items,customer){
    console.log("test");
    // Put the payment variables here
    let payment = {
      "sandbox": true,
      "merchant_id": "1217019", // Replace your Merchant ID
      "return_url": undefined, // Important
      "cancel_url": undefined, // Important
      "notify_url": "http://sample.com/notify",
      "order_id": "ItemNo12345",
      "items": "Door bell wireles",
      "amount": "1000.00",
      "currency": "LKR",
      "first_name": "Saman",
      "last_name": "Perera",
      "email": "samanp@gmail.com",
      "phone": "0771234567",
      "address": "No.1, Galle Road",
      "city": "Colombo",
      "country": "Sri Lanka",
      "delivery_address": "No. 46, Galle road, Kalutara South",
      "delivery_city": "Kalutara",
      "delivery_country": "Sri Lanka",
      "custom_1": "",
      "custom_2": ""
    };
    payhere.startPayment(payment);

    
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

  //alert set
  setAlert(alertStatus:String, alertMessage:String): void{
    this.userAlert = {
      status : alertStatus,
      message : alertMessage
    }
  }

  // checkCustomerByEmail(){
  //   // console.log(categoryId);
  //   // this.loading = true;

  //   console.log("1111this.userExist");
  //   console.log(this.userExist);
  //   console.log("1111this.userExist");
  //     this.checkoutService.checkCustomerByEmail(this.UserNameEmail).subscribe((response) => {
       
  //       setTimeout(() => { this.loading = false; }, 1500);
  //       let resp  = response["customer"];
  //       if(response["code"] == 200){
  //         this.userExist = true;
  //         console.log("Success");
  //         // this.showToast("success", "Found User", "User Registration Found!");

  //       }else{
  //         console.log("User Not Found");
  //         // this.showToast("success", "User Not Found", "Please Register as New User!");

  //         this.userExist = false;

  //       }



  //       console.log("this.userExist");
  //       console.log(this.userExist);
  //       console.log("this.userExist");
  //     });
    
  // }
  changeView(view,data){
    this.view = view
    if(view == "add"){

    }else if (view == "edit"){

    }else{

    }
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
        setTimeout(() => { this.loading = false; }, 1500);

        if(response['code'] ===200){//success
          // this.localStorageService.setToken(response['token']);//store token
          // this.showToast("warning", "User Credential Valid", "Login Credentials are Valid!");

          this.localStorageService.setData(response['customer'][0]);
          this.customerDetails = this.localStorageService.getData();
          this.disabledForm = true;
          console.log("his.localStorageService.setData(response['customer'][0]);");

        }else if(response['code'] ==407){//error
         this.usernameNotFound=true;
          // swal("Login Error!", "Invalid Username", "warning");
          // this.showToast("warning", "Invalid Username", "Login Credentials are Invalid!");



        }else if(response['code'] ==408){//error
          this.passwordIncorrect=true;
          //  swal("Login Error!", "Invalid Username", "warning");
          //  this.showToast("warning", "Invalid Password", "Login Credentials are Invalid!");
 
 
        }else if(response['code'] ==403){//error
          // this.inactiveLogin=true;
          // swal("Login Error!", "Your Account has not been activated yet.", "warning");
          // this.showToast("warning", "Your Account has not been activated yet.", "Login Error!");


        }else{//error
          
          // swal("Error!", response['message'], "error");

          setTimeout(() => { this.loading = false; }, 1500);

        }
      });
    }else{
      setTimeout(() => { this.loading = false; }, 1500);

      // swal("Login Error!", "Please fill required fields!", "warning");

      // swal("Login invalid","Please fill required fields!", "warning");
     
    }
  }

  create(){
    // this.codeExists = false;
    this.loading = true;
    let formData = new FormData();
    let data : object;
    data = {
      'firstName'   : this.customerForm.value.firstName,
      'lastName'    : this.customerForm.value.lastName,
      'address'     : this.customerForm.value.address,
      'houseNo'     : this.customerForm.value.houseNo,
      'town'        : this.customerForm.value.town,
      'nic'         : this.customerForm.value.nic,
      'contactNo'   : this.customerForm.value.contactNo,
      'email'       : this.customerForm.value.email,
      'password'    : this.customerForm.value.password
    }
    console.log(data);
    console.log(this.customerForm.valid); 
    const invalid = [];
        const controls = this.customerForm.controls;
        for (const name in controls) {
            if (controls[name].invalid) {
                invalid.push(name);
            }
        };
      console.log("invalid");
      console.log(invalid);
    if(this.userExist){
      // swal("Email already Registered!", "Try Different Email", "warning");
    }else if(this.customerForm.valid){
      data = {
        'firstName'   : this.customerForm.value.firstName,
        'lastName'    : this.customerForm.value.lastName,
        'address'     : this.customerForm.value.address,
        'houseNo'     : this.customerForm.value.houseNo,
        'town'        : this.customerForm.value.town,
        'nic'         : this.customerForm.value.nic,
        'contactNo'   : this.customerForm.value.contactNo,
        'email'       : this.customerForm.value.email,
        'password'    : this.customerForm.value.password
      }
      
      this.checkoutService.create(data).subscribe((response) => {
        setTimeout(() => { this.loading = false; }, 1500);
        


        if(response['code'] == '401'){//validation error
          response["validationErrors"].forEach( (currentValue, index) => {
            // if(currentValue.key == "code"){

              // this.showToast("warning", "Validation Error", currentValue.message);
          // swal(currentValue.message, "Validation Error", "warning");

            // }else{
            //   this.showToast("warning", "Validation Error", currentValue.message);

            // }
          });

        }else if(response['code'] == '200'){
          // this.showToast("success", "Success", "Customer Registration Successfully!");
      // swal("Customer Registered!", "Success", "success");

          this.localStorageService.setData(response['customer'][0]);
          this.customerDetails = this.localStorageService.getData();
          this.disabledForm = true;

          // this.changeView('default', null);
        }else if(response['code'] != '200'){
          // this.showToast("danger", "Failed", "Customer Registration Unsuccessful!");
          // swal("Customer Registration Unsuccessful!", "Failed", "warning");

          
        }else{
          // this.showToast("warning", "Customer Registration", "Something Went Wrong");
          // swal("Something Went Wrong", "Failed", "error");

        }
      });
      setTimeout(() => { this.loading = false; }, 1500);

    }else{
      this.loading = false;
      // this.showToast("warning", "Invalid", "Form Data Invalid");
      // swal("Fill all required fields with valid data", "Incomplete Data", "warning");


    }
  }

  checkLogin(){
    
    this.customerDetails = this.localStorageService.getData();
    // if(this.customerDetails != null){
    //   this.disabledForm = true;
    // }
    console.log(this.customerDetails);
  }

  // createOrder(){
  //   // this.codeExists = false;
  //   this.loading = true;
  //   let formData = new FormData();
  //   let data : object;
    
  //   console.log(this.customerForm.value.pymtMTHD);
  //   console.log(data);
  //   console.log(this.customerForm.value.pymtMTHD);
    
  //   if(this.customerDetails != null || this.cartDetails != null){

  //     let products = [];

  //     for(let x of this.cartDetails){
  //       let productItem = {
  //         "productId": x.productId,
  //         "quantity": x.quantity,
  //       }

  //       products.push(productItem);
  //     }
  //     data = {
  //       'customer'      : {"customerId" : this.customerDetails["customerId"]},
  //       'product'       : products,
  //       'paymentMethod' : this.customerForm.value.pymtMTHD,
  //       'paymentStatus' : this.paymentStatus,
  //       'totalBill'     : this.total,
  //       'refernceNo'    : this.refernceNo,
  //     }

  //     console.log(data);
      
  //     this.orderService.create(data).subscribe((response) => {
  //       setTimeout(() => { this.loading = false; }, 1500);
        


  //       if(response['code'] == '401'){//validation error
  //         response["validationErrors"].forEach( (currentValue, index) => {
  //           if(currentValue.key == "code"){

  //             this.showToast("warning", "Validation Error", currentValue.message);
  //           }else{
  //             this.showToast("warning", "Validation Error", currentValue.message);

  //           }
  //         });

  //       }else if(response['code'] == '200'){
  //         // this.showToast("success", "Success", "Customer Registration Successfully!");

  //         // this.localStorageService.setData(response['customer']);
  //         // this.customerDetails = this.localStorageService.getData();
  //         // this.disabledForm = true;
  //         // swal("Successful !","You order creation success", "success");

  //         if(this.paymentMthd == "ON"){
  //           let itemsString = "";
  //           let createdOrder = null;
  //           for(let x of this.cartDetails){
  //             itemsString += x.productDescription+" ";
  //           }

  //           for(let y of response['orders']){
  //             createdOrder = y.orderId;
  //           }
  //           this.callCheckout(createdOrder,itemsString,this.customerDetails);
  //           let emptyCartDetails = [];
  //           this.cartService.setCartData(emptyCartDetails);
  //         }else{
  //           let redirectUrl = '/shop/landing';
  //           console.log("Router");
  //           setTimeout(() => { this.router.navigate([redirectUrl]) }, 1000);
  //           let emptyCartDetails = [];
  //           this.cartService.setCartData(emptyCartDetails);
  //         }
  //         // this.changeView('default', null);
  //       }else if(response['code'] != '200'){
  //         // this.showToast("danger", "Failed", "Customer Registration Unsuccessful!");
  //         // swal("Unsuccessful !","You order creation failed", "warning");

          
  //       }else{
  //         // this.showToast("warning", "Customer Registration", "Something Went Wrong");
  //         // swal("Unsuccessful !","You order creation failed", "warning");

  //       }
  //     });
  //     setTimeout(() => { this.loading = false; }, 1500);

  //   }else{
  //     this.loading = false;
  //     // this.showToast("warning", "Invalid", "Form Data Invalid");
  //     // swal("Login invalid","Please Login or Register an account", "warning");


  //   }
  // }
            // swal(response["message"],currentValue.message, "warning");

  
}
