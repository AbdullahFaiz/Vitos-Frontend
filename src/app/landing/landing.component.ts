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
  @ViewChild('f') signin: NgForm;

  loading   : boolean = false; //loading
  userAlert : any;
  loginForm : FormGroup;
  menuList : any = [];

  usernameNotFound = false;
  passwordIncorrect = false;
  inactiveLogin = false;
  selectedCategoryIndex = 0;
  categoryList = [];
  tempcategoryList = [];

  brandList = [];
  tempbrandList = [];


  pizzaList = [];
  tempPizzaList = [];
  productList = [];
  productList2 = [
    {
      "productId"   : 1,
      "productDescription" : "apple",
      "cartQuantity"    : 3,
      "brand":{"description" : "orange",},
      "unitPrice"   : 130,
      "productImage1" : "https://static.toiimg.com/thumb/53110049.cms?width=1200&height=900"
    },
    {
      "productId"   : 2,
      "productDescription" : "tesgt",
      "cartQuantity"    : 3,
      "brand":{"description" : "rose",},
      "quantity"    : 1,
      "unitPrice" : 110,
      "productImage1" : "https://static.toiimg.com/photo/msid-87930581/87930581.jpg?211826"
    },
    {
      "productId"   : 3,
      "productDescription" : "apfffffple",
      "cartQuantity"    : 3,
      "brand":{"description" : "banana",},
      "quantity"    : 2.33,
      "unitPrice" : 900,
      "productImage1" : "https://static.toiimg.com/thumb/53110049.cms?width=1200&height=900"
    },
    {
      "productId"   : 4,
      "productDescription" : "rice",
      "cartQuantity"    : 3,
      "brand":{"description" : "apple",},
      "quantity"    : 10,
      "unitPrice" : 130,
      "productImage1" : "https://static.toiimg.com/photo/msid-87930581/87930581.jpg?211826"
    }
  ];
  tempproductList = [];

  categoryproductList = [];
  tempcategoryproductList = [];
  cartItemsCount = 0;

  imgURL = "background-image: url(https://teamenigma.blob.core.windows.net/mbitproj/SM-3256image1-2021101…-5613-4be2-8e87-4ca467db33aes21 pis.jpeg);}";
  view : String = "default";

  items = [];
  pageOfItems: Array<any>;

  searchText = '';
  constructor(
    private localStorageService: LocalStorageService,
    private cartService: CartService,
    private landingService: LandingService,
    private router: Router,) {}

  ngOnInit() {
    this.initForm();
    this.items = Array(150).fill(0).map((x, i) => ({ id: (i + 1), name: `Item ${i + 1}`}));
    // this.getAllActiveCategory();
    this.getPizzaByCategory();
  }

  onChangePage(pageOfItems: Array<any>) {
      // update current page of items
      this.pageOfItems = pageOfItems;
  }

  getUrl(url){
    // console.log("url("+url+")");
    return "url("+url+")";
  }
  //Initialize the Add Form
  private initForm(){
    this.loginForm = new FormGroup({
      'username'  : new FormControl(null, Validators.required),
      'password'  : new FormControl(null, Validators.required)
    });
  }


  //get all Active Product
  getAllActiveProduct(){
    // this.typeSuccess();
    this.loading = true;
    // this.productService.getAllActiveProduct().subscribe((response) => {
    //   this.productList  = [];
    //   this.tempproductList  = [];

    //   setTimeout(() => { this.loading = false; }, 1500);
    //   this.productList  = response["product"];
    //   this.tempproductList  = response["product"];

    //   this.getAllProductByCategory(0);
    //   console.log("this.productList");
    //   console.log(this.productList);
    //   console.log("this.productList");

    // })
  }

  //get all  PizzaByCategory
  getPizzaByCategory(){
    // this.typeSuccess();
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


  
  //alert set
  setAlert(alertStatus:String, alertMessage:String): void{
    this.userAlert = {
      status : alertStatus,
      message : alertMessage
    }
  }

  changeView(view,data){
    this.view = view
    if(view == "add"){

    }else if (view == "edit"){

    }else{

    }
  }

  getAllProductByCategory(categoryId){
    console.log(categoryId);
    this.selectedCategoryIndex = categoryId;
    this.loading = true;
    if(categoryId != 0){
      // this.productService.getAllProductByCategory(categoryId).subscribe((response) => {
      //   this.categoryproductList  = [];
      //   this.tempcategoryproductList  = [];

      //   setTimeout(() => { this.loading = false; }, 1500);
      //   let resp  = response["product"];



      //   for(let catProd of resp){
      //     catProd.cartQuantity = 0;
      //     this.categoryproductList.push(catProd);
      //     this.tempcategoryproductList.push(catProd);
      //   }

      //   console.log("this.categoryproductList");
      //   console.log(this.categoryproductList);
      //   console.log("this.categoryproductList");
      // });
    }else{
      // this.productService.getAllActiveProduct().subscribe((response) => {
      //   this.categoryproductList  = [];
      //   this.tempcategoryproductList  = [];

      //   setTimeout(() => { this.loading = false; }, 1500);
        let resp  = this.tempproductList.slice();



        for(let catProd of resp){
          catProd.cartQuantity = 0;
          this.categoryproductList.push(catProd);
          this.tempcategoryproductList.push(catProd);
        }

        console.log("this.categoryproductList");
        console.log(this.categoryproductList);
        console.log("this.categoryproductList");

      // });
    }
  }
  subQuantity(product){
    console.log(product);
    product.quantity -= 1;
  }

  addQuantity(product){
    console.log(product);
    product.quantity += 1;
  }

  updateCart(product){
    
    let cartDT = this.cartService.getCartData();
    console.log("cartDT");
    console.log(cartDT);
    let quantityCheck = false;
    for(let x of this.tempproductList){
      if (x.quantity >= product.cartQuantity){
          quantityCheck = true;   
      }
    }
    if(quantityCheck){
      let prdt = {
        "productId"   : product.productId,
        "description" : product.productDescription,
        "quantity"    : product.cartQuantity,
        "unitPrice"   : product.unitPrice,
        "image"       : product.productImage1,
      };
      if(cartDT==null){
        cartDT = [prdt]
      }else{
        cartDT.push(prdt);
      }
      this.cartService.setCartData(cartDT);
      console.log("cartDT - final productList");
      console.log(cartDT);
      
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
      // this.cartItemsCount = cartDT.length;
      console.log(this.cartItemsCount);
    }else{
      
      // swal("Quantity Max !","You quantity exceeds more than availabe", "warning");
    }
    
  }
  updateFilter(event) {
    console.log(this.searchText);
    console.log("this.searchText");
    console.log(event);
    const val = event.target.value.toLowerCase();
    this.searchText =val;
    // filter our data
    const temp = this.tempproductList.filter(function (d) {
        return d.productDescription.toLowerCase().indexOf(val) !== -1 || !val;
    });
  
    
    // update the rows
    this.productList = temp;
  }
  
}
