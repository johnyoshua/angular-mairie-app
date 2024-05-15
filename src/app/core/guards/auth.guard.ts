import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from "rxjs";
import { TokenService } from "src/app/login/services/token.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private auth: TokenService,
    private router: Router) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean>| boolean {
      const token = this.auth.getToken();
      if (token) {
        return true;
      } else {
        this.router.navigateByUrl('/login');
        return false;
      }
    }
}
