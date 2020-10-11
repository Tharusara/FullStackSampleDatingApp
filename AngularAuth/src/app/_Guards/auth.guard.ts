import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../_shared/auth.service';
import { AlertifyService } from '../_shared/alertify.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authservice: AuthService,
              private router: Router,
              private alertify: AlertifyService) {}
  canActivate(next: ActivatedRouteSnapshot): boolean {
    const roles = next.firstChild.data.roles as Array<string>;
    if (roles) {
      const match = this.authservice.roleMatch(roles);
      if (match) {
        return true;
      } else {
        this.router.navigate(['members']);
        this.alertify.error('you are not authorized to acess this area!');
      }
    }
    if (this.authservice.loggedIn()) {
      return true;
    }
    this.alertify.error('you are not logged in!!!');
    this.router.navigateByUrl('/home');
  }

}
