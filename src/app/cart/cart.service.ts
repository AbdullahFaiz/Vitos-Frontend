import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
// import { catchError} from 'rxjs/operators';
// import { _throw } from 'rxjs/observable/throw';

import { _throw } from 'rxjs-compat/observable/throw';
import { LocalStorageService } from '../common/local-storage/local-storage.service';


@Injectable()
export class CartService {
    // Create HTTP Request header
    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type'                  : 'application/json',
            'Access-Control-Allow-Origin'   : '*'
        })
    };
    
    constructor(
        private router              : Router,
        private httpClient          : HttpClient,
        private localStorageService : LocalStorageService
        ) { }
        
    //api URL
    apiUrl = this.localStorageService.getApiServerUrl();

    // HTTP request error handling
    private handleError(error: HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
            console.error('An error occurred:', error.error.message);
        } else {
            console.error('Backend returned code error'+ error);
        }
        return _throw('Something bad happened; please try again later.');
    }

    // Remove Cart data
    public removeCartData() {
        window.localStorage.removeItem('shopping-cart-data');
    }

    //set Cart data
    setCartData(data:any):void{
        window.localStorage.setItem('shopping-cart-data',JSON.stringify(data));
    }
    getCartData():any{
        return JSON.parse(window.localStorage.getItem('shopping-cart-data'));
    }

}