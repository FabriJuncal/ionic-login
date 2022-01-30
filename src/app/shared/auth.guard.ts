import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { take, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authSvc: AuthService, private router: Router) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      return this.authSvc.user$.pipe(
        take(1),
        map(user => {
          if (user) {

            // Si el email esta verificado no redirecciona
            if(user.emailVerified){
                return true;
            }
            else{ // Si el email no esta verificado redirecciona a la pantalla de Verificación de Email
                this.router.navigate(['/verify-email']);
                return false;
            }

          }else{ // Si no existe sesión redirecciona al Login
            this.router.navigate(['/login']);
            return false;
          }
        })
      );
  }

}
