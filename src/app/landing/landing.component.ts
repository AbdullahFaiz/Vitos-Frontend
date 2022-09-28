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
  pizzaList2 = [
    {
      "pizzaId"   : 1,
      "pizzaDescription" : "apple",
      "cartQuantity"    : 3,
      "brand":{"description" : "orange",},
      "unitPrice"   : 130,
      "pizzaImage1" : "https://static.toiimg.com/thumb/53110049.cms?width=1200&height=900"
    },
    {
      "pizzaId"   : 2,
      "pizzaDescription" : "tesgt",
      "cartQuantity"    : 3,
      "brand":{"description" : "rose",},
      "quantity"    : 1,
      "unitPrice" : 110,
      "pizzaImage1" : "https://static.toiimg.com/photo/msid-87930581/87930581.jpg?211826"
    },
    {
      "pizzaId"   : 3,
      "pizzaDescription" : "apfffffple",
      "cartQuantity"    : 3,
      "brand":{"description" : "banana",},
      "quantity"    : 2.33,
      "unitPrice" : 900,
      "pizzaImage1" : "https://static.toiimg.com/thumb/53110049.cms?width=1200&height=900"
    },
    {
      "pizzaId"   : 4,
      "pizzaDescription" : "rice",
      "cartQuantity"    : 3,
      "brand":{"description" : "apple",},
      "quantity"    : 10,
      "unitPrice" : 130,
      "pizzaImage1" : "https://static.toiimg.com/photo/msid-87930581/87930581.jpg?211826"
    }
  ];
  temppizzaList = [];

  cartItemsCount = 0;

  
  customerDetails = null;

  // items = [];
  // pageOfItems: Array<any>;

  constructor(
    private localStorageService: LocalStorageService,
    private cartService: CartService,
    private landingService: LandingService,
    private router: Router,) {}

  ngOnInit() {
    // this.items = Array(150).fill(0).map((x, i) => ({ id: (i + 1), name: `Item ${i + 1}`}));
    this.checkLogin();
    this.getPizzaByCategory();
  }

  // onChangePage(pageOfItems: Array<any>) {
  //     // update current page of items
  //     this.pageOfItems = pageOfItems;
  // }

  getUrl(url){
    // console.log("url("+url+")");
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
      console.log("cartDT");
      console.log(cartDT);
      let quantityCheck = false;
      // for(let x of this.temppizzaList){
      //   if (x.quantity >= 1){
      //       quantityCheck = true;   
      //   }
      // }
      console.log(pizza)
      console.log(pizza.quantity)
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
        
        // this.cartItemsCount = cartDT.length;
        console.log(this.cartItemsCount);
        swal.fire("Pizza added to cart","", "success");

      }else{
        
        swal.fire("Quantity Max !","You quantity exceeds more than availabe", "warning");
      }
    }else{
      swal.fire("Not Logged !","Please login to add pizza to cart", "warning");

    }
  }
  
  // subQuantity(pizza){
  //   console.log(pizza);
  //   pizza.quantity -= 1;
  // }

  // addQuantity(pizza){
  //   console.log(pizza);
  //   pizza.quantity += 1;
  // }
}
