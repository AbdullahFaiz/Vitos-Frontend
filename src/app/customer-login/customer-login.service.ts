import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
// import { catchError} from 'rxjs/operators';
import { _throw } from 'rxjs/observable/throw';
import { LocalStorageService } from '../../common/local-storage/local-storage.service';



@Injectable()
export class CustomerLoginService {
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
    apiUrl = this.localStorageService.getApiServerUrl()+"/customer";

    // HTTP request error handling
    private handleError(error: HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
            console.error('An error occurred:', error.error.message);
        } else {
            console.error('Backend returned code error'+ error);
        }
        return _throw('Something bad happened; please try again later.');
    }

    // login
    authenticate(loginData:any) {
        return this.httpClient.post(this.apiUrl + '/login', loginData, this.httpOptions)
        .pipe(
            catchError(this.handleError)
        );
    }

    // Logout user
    logout() {
        this.localStorageService.removeLocalStorageData();
        this.router.navigate(['/login']);
    }

}