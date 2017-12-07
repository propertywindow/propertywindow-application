import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {UserService} from "../services";
import {Observable} from "rxjs/Rx";

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router, private userService: UserService) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
        return this.userService.verify().map(
            data => {
                if (!data.error) {
                    return true;
                }
                this.router.navigate(['/login'], {queryParams: {returnUrl: state.url}});
                return false;
            },
            error => {
                this.router.navigate(['/login'], {queryParams: {returnUrl: state.url}});
                return false;
            });
    }
}
