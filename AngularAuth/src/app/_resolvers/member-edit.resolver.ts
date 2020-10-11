import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { User } from '../_Models/user';
import { UserService } from '../_shared/user.service';
import { AlertifyService } from '../_shared/alertify.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../_shared/auth.service';

@Injectable()
export class MemberEditResolver implements Resolve<User> {
    constructor(private userService: UserService, private auth: AuthService,
                private router: Router, private alertify: AlertifyService) {}

                // router.params['id']
        resolve(router: ActivatedRouteSnapshot): Observable <User> {
            return this.userService.getUser(this.auth.decodedToken.nameid).pipe(
                catchError(error => {
                    this.alertify.error('problem retrieving your data');
                    this.router.navigate(['/members']);
                    return of(null);
                })
            );
        }
}
