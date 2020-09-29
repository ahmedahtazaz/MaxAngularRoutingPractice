import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";

export interface canDeActivateComponent{
    canDeActivate: () => Observable<boolean> | Promise<boolean> | boolean;
}

@Injectable()
export class canDeActivateGuard implements CanDeactivate<canDeActivateComponent>{
    
    canDeactivate(component: canDeActivateComponent, currentRoute: ActivatedRouteSnapshot, currentState: RouterStateSnapshot, nextState?: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        return component.canDeActivate();
    }
}