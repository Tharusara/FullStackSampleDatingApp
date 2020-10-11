import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/_Models/user';
import { AuthService } from 'src/app/_shared/auth.service';
import { UserService } from 'src/app/_shared/user.service';
import { AlertifyService } from 'src/app/_shared/alertify.service';

@Component({
  selector: 'app-member-card',
  templateUrl: './member-card.component.html',
  styleUrls: ['./member-card.component.css']
})
export class MemberCardComponent implements OnInit {
@Input() user: User;
  constructor(private auth: AuthService, private userService: UserService,
              private alertify: AlertifyService) { }

  ngOnInit() {
  }
  sendLikes(id: number) {
    this.userService.sendLikes(this.auth.decodedToken.nameid, id).subscribe(data => {
      this.alertify.success('you liked ' + this.user.knownAs);
    }, error => {
      this.alertify.error('you can"t like at this time');
    });
  }

}
