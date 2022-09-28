import { Component } from '@angular/core';
import { interval, Subscription } from 'rxjs';
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
    // private productService: ProductService,
    // private toastrService: NbToastrService
    ) {}


  url = window.location.pathname; 
  cartItemsCount = 0;
  cartItemTotal = 0;

  subscription: Subscription;
  subscribeEmail = null;
  customerDetails = null;
  ngOnInit() {
    console.log("window.location.pathname");
    console.log("window.location.pathname");
    console.log("window.location.pathname");
    const source = interval(2000);
    const text = 'Your Text Here';
    this.getCartDetails();
    // this.subscription = source.subscribe(val => this.testSubscription());

    console.log(window.location.pathname);
  }

  ngOnDestroy() {
    // For method 1
    this.subscription && this.subscription.unsubscribe();

  }
  // Toaster 
  // config: NbToastrConfig;

  // index = 1;
  // destroyByClick = true;
  // duration = 2000;
  // hasIcon = true;
  // // position: NbGlobalPosition = NbGlobalPhysicalPosition.TOP_RIGHT;
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


  // offerSubscribe(){
  //   let data : object;
    
  //   console.log(data);
  //   if(this.subscribeEmail != null || this.subscribeEmail != ""){
  //     data = {
  //       'email'             :  this.subscribeEmail
  //     }
  //   console.log(data);
  //   console.log(data);
      
  //     this.productService.offerSubscribe(data).subscribe((response) => {
        


  //       if(response['code'] == '401'){//validation error
  //         response["validationErrors"].forEach( (currentValue, index) => {
  //           if(currentValue.key == "code"){

  //             this.showToast("warning", "Validation Error", currentValue.message);
  //           }else{
  //             this.showToast("warning", "Validation Error", currentValue.message);

  //           }
  //         });

  //       }else if(response['code'] == '200'){
  //         this.showToast("success", "Success", "Successfully Subscribed for Promotions!");

  //       }else if(response['code'] != '200'){
  //         this.showToast("danger", "Failed", "Unsuccessfully Subscribed for Promotions!");

          
  //       }else{
  //         this.showToast("warning", "Warning", "Something Went Wrong");

  //       }
  //     });
  //   }
  // }

  toggleNav(path){
    this.url = path;
  }

  getCartDetails(){
    
    let products = [
      {
        "productId"   : 1,
        "description" : "apple",
        "quantity"    : 3,
        "unitPrice" : 130,
      },
      {
        "productId"   : 2,
        "description" : "orange",
        "quantity"    : 1,
        "unitPrice" : 110,
      },
      {
        "productId"   : 3,
        "description" : "graped",
        "quantity"    : 2.33,
        "unitPrice" : 900,
      },
      {
        "productId"   : 4,
        "description" : "rice",
        "quantity"    : 10,
        "unitPrice" : 130,
      }
    ];
    let cartDetails = {
      "products"  : products
    };
    
    this.cartItemsCount = products.length;
  }

  testSubscription(){
    console.log("this.customerDetails");

    this.checkLogin();

    this.toggleNav(window.location.pathname);
    let cartDT = this.cartService.getCartData();
    this.cartItemsCount = Math.floor(Math.random() * 9) + 1;
    if(cartDT != null){
      this.cartItemsCount = cartDT.length;
      this.cartItemTotal = 0;
      // console.log(cartDT);
      for(let item of cartDT){
        // console.log(Number(item["quantity"]));
        // console.log(Number(item["unitPrice"]));
        // console.log(item["quantity"]);
        // console.log(item["unitPrice"]);
        this.cartItemTotal += (Number(item["quantity"]) * Number(item["unitPrice"]));
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
    // console.log(this.customerDetails);

    this.customerDetails = this.localStorageService.getData();
    if(this.customerDetails != null){
      console.log(this.customerDetails);

    }
    console.log("NULL CUstomer" + this.customerDetails);

  }
}
