import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { _throw } from 'rxjs/observable/throw';

import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { LocalStorageService } from '../common/local-storage/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class LandingService {

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
  apiUrl = this.localStorageService.getApiServerUrl() + '/pizza';

  // HTTP request error handling
  private handleError(error: HttpErrorResponse) {
    if (error.status == 403) {
      window.location.replace("./home");
    }
    if (error.error instanceof ErrorEvent) {
        console.error('An error occurred:', error.error.message);
    } else {
        console.error('Backend returned code error'+ error);
    }
    return _throw('Something bad happened; please try again later.');
  }

  getAllPizzaByCategory() {
      return this.httpClient.get(this.apiUrl+"/category-wise", this.httpOptions)
          .pipe(
              catchError(this.handleError)
          );
  }

  
}
