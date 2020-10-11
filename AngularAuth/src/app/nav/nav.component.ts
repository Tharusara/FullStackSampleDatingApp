import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_shared/auth.service';
import { AlertifyService } from '../_shared/alertify.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
model: any = {};

  constructor(public authService: AuthService, private alertify: AlertifyService,
              private router: Router) { }

  ngOnInit(): void {
  }

  login() {
    this.authService.login(this.model).subscribe(next => {
      this.alertify.success('login successful');
      console.log(next);
    }, error => {
      this.alertify.error('Invalid User');
      console.log(error);
    }, () => {
      this.router.navigate(['members']);
    });
  }
  loggedin() {
    return this.authService.loggedIn();
  }
  logout() {
    localStorage.removeItem('token');
    this.alertify.message('logged out');
    // this.router.navigateByUrl('/home');
    this.router.navigate(['home']);
  }

}
