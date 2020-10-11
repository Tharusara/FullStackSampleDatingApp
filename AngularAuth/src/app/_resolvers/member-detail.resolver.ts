import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { User } from '../_Models/user';
import { UserService } from '../_shared/user.service';
import { AlertifyService } from '../_shared/alertify.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class MemberDetailResolver implements Resolve<User> {
    constructor(private userService: UserService,
                private router: Router, private alertify: AlertifyService) {}

                // router.params['id']params.id
        resolve(router: ActivatedRouteSnapshot): Observable <User> {
            return this.userService.getUser(router.params['id']).pipe(
                catchError(error => {
                    this.alertify.error('problem retrieving data');
                    this.router.navigate(['/members']);
                    return of(null);
                })
            );
        }
}
