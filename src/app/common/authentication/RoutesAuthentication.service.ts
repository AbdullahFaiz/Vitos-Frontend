import { Injectable } from "@angular/core";
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { LocalStorageService } from "../local-storage/local-storage.service";
import { Observable } from 'rxjs';

@Injectable()
export class RoutesAuthentication implements CanActivate {

    constructor(
        protected router: Router,
        protected localStorageService: LocalStorageService
        ){
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
        
            return true;
       

    }
}