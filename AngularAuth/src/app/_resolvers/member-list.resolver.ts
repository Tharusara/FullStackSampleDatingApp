import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { User } from '../_Models/user';
import { UserService } from '../_shared/user.service';
import { AlertifyService } from '../_shared/alertify.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class MemberListResolver implements Resolve<User[]> {
  pageNumber = 1;
  pageSize = 6;
    constructor(private userService: UserService,
                private router: Router, private alertify: AlertifyService) {}

        resolve(router: ActivatedRouteSnapshot): Observable <User[]> {
            return this.userService.getUsers().pipe(
                catchError(error => {
                    this.alertify.error('problem retrieving data');
                    this.router.navigate(['/home']);
                    return of(null);
                })
            );
        }
        // resolve(router: ActivatedRouteSnapshot): Observable <User[]> {
        //     return this.userService.getUsers(this.pageNumber, this.pageSize).pipe(
        //         catchError(error => {
        //             this.alertify.error('problem retrieving data');
        //             this.router.navigate(['/home']);
        //             return of(null);
        //         })
        //     );
        // }
}
