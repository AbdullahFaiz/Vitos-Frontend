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
  userAlert : any;
  loginForm : FormGroup;
  menuList : any = [];
  customerDetailsForm: FormGroup;

  usernameNotFound = false;
  passwordIncorrect = false;
  inactiveLogin = false;
  cartDetails = [];
  productList= [];
  view : String = "default";
  subTotal = 0;
  total = 0;

  constructor(
    private cartService: CartService,
    private localStorageService: LocalStorageService,
    private router: Router,
    private formBuilder:FormBuilder) {}

    index = 1;
    destroyByClick = true;
    duration = 2000;
    hasIcon = true;
    // position: NbGlobalPosition = NbGlobalPhysicalPosition.TOP_RIGHT;
    preventDuplicates = false;
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
    //     `Toast ${this.index}${titleContent}`,
    //     config);
    // }

  ngOnInit() {
    this.initForm();
    
    this.cartDetails = this.cartService.getCartData();
    this.updateCart();     

  }
  

  //Initialize the Add Form
  private initForm(){
    this.loginForm = new FormGroup({
      'username'  : new FormControl(null, Validators.required),
      'password'  : new FormControl(null, Validators.required)
    });

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
    alert("ok");
    let data : object;
    data = {
      'fullName'  : this.customerDetailsForm.value.fullName,
      'address'  : this.customerDetailsForm.value.address,
      'city'  : this.customerDetailsForm.value.city,
      'postCode'  : this.customerDetailsForm.value.postCode,
      'contactNumber'  : this.customerDetailsForm.value.contactNumber,
      'email'  : this.customerDetailsForm.value.email,
      'emailRepeat'  : this.customerDetailsForm.value.emailRepeat,
      'password'  : this.customerDetailsForm.value.password
    }
    console.log(data);
    if(this.customerDetailsForm.valid){
      // this.cartService.create();
      // this.showToast("success", "Success", "Brand Created Successfully!");

      this.customerDetailsForm.reset();

    }else{
      // this.showToast("warning", "Invalid", "Form Data Invalid");

    }
  }

  //alert set
  setAlert(alertStatus:String, alertMessage:String): void{
    this.userAlert = {
      status : alertStatus,
      message : alertMessage
    }
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
      console.log(Number(item["cartQuantity"]));
      // console.log(Number(item["unitPrice"]));
      // console.log(item["quantity"]);
      // console.log(item["unitPrice"]);
      this.subTotal += (Number(item["cartQuantity"]) * Number(item["unitPrice"]));
      this.total += (Number(item["cartQuantity"]) * Number(item["unitPrice"]));
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
