import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

//api SERVER URL
const API_SERVER_URL = '//localhost:8080';



@Injectable()
export class LocalStorageService {
    constructor(
        private router: Router
        ) { }

    
    //logout
    clearLogin():void{
        window.localStorage.clear();
    }

    logOut(){
        this.router.navigate(['/landing']);
    }
    //get server api url
    getApiServerUrl():string{
        return API_SERVER_URL;
    }
    
    //set data
    setData(data:any):void{
        window.localStorage.setItem('data',JSON.stringify(data));
    }
    getData():any{
        return JSON.parse(window.localStorage.getItem('data'));
    }
    
}
