import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { User } from '../_Models/user';
import { UserService } from '../_shared/user.service';
import { AlertifyService } from '../_shared/alertify.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Message } from '../_Models/message';
import { AuthService } from '../_shared/auth.service';

@Injectable()
export class MessageResolver implements Resolve<Message[]> {
    messageContainer = 'Unread';
    constructor(private userService: UserService, private auth: AuthService,
                private router: Router, private alertify: AlertifyService) {}

        resolve(router: ActivatedRouteSnapshot): Observable <Message[]> {
            return this.userService.getMessages(this.auth.decodedToken.nameid, this.messageContainer).pipe(
                catchError(error => {
                    this.alertify.error('problem retrieving Messages');
                    this.router.navigate(['/home']);
                    return of(null);
                })
            );
        }
}
