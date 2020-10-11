import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { User } from 'src/app/_Models/user';
import { ActivatedRoute } from '@angular/router';
import { AlertifyService } from 'src/app/_shared/alertify.service';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/_shared/auth.service';
import { UserService } from 'src/app/_shared/user.service';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css']
})
export class MemberEditComponent implements OnInit {
  @ViewChild('editForm', {static: true}) editForm: NgForm;
  user: User;
  @HostListener('window:beforeunload', ['$event'])
  unloadNotfication($event: any) {
    if (this.editForm.dirty) {
      $event.returnValue = true;
    }
  }
  constructor(private route: ActivatedRoute, private alertify: AlertifyService,
              private userService: UserService, private auth: AuthService) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.user = data.user;
    });
  }
  updateUser() {
    this.userService.UpdateUser(this.auth.decodedToken.nameid, this.user).subscribe(next => {
      this.alertify.success('profile updated Successfully');
      this.editForm.reset(this.user);
    }, error => {
      this.alertify.error('something went wrong' + error);
    });
  }

}
