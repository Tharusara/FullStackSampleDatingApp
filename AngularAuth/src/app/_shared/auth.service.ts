import { Injectable } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';
import { User } from '../_Models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  readonly baseURL = environment.apiUrl + 'auth/';
  jwtHelper = new JwtHelperService();

  constructor(
    private fb: FormBuilder,
    private http: HttpClient) { }
    decodedToken: any;

    login(model: any) {
      return this.http.post(this.baseURL + 'login', model).pipe(
        map((response: any) => {
          const user = response;
          if (user) {
            localStorage.setItem('token', user.token);
            this.decodedToken = this.jwtHelper.decodeToken(user.token);
            console.log(this.decodedToken);
          }
        })
      );
    }
    register(user: User) {
      return this.http.post(this.baseURL + 'register', user);
    }

    loggedIn() {
      const token = localStorage.getItem('token');
      return this.jwtHelper.decodeToken(token);
    }

    roleMatch(allowedRoles): boolean {
      let isMatch = false;
      const userRoles = this.decodedToken.role as Array<string>;
      allowedRoles.forEach(element => {
        if (userRoles.includes(element)) {
          isMatch = true;
          return;
        }
      });
      return isMatch;
    }

  // formModel = this.fb.group({
  //   UserName : ['', Validators.required],
  //   FullName: ['', Validators.required],
  //   Email: ['', Validators.email],
  //   PassWords: this.fb.group({
  //     PassWord: ['', [Validators.required, Validators.minLength(4)]],
  //     ConfirmPassword: ['', Validators.required]
  //   }, {validators: this.comparePasswords})
  // });

  // comparePasswords(fb: FormGroup) {
  //   const confirmPswCntrl = fb.get('ConfirmPassword');
  //   if (confirmPswCntrl.errors == null || 'passwordmismatch' in confirmPswCntrl.errors) {
  //     if (fb.get('PassWord').value != confirmPswCntrl.value) {
  //     confirmPswCntrl.setErrors({passwordmismatch: true});
  //     } else {
  //     confirmPswCntrl.setErrors(null);
  //     }
  //   }
  // }

  // Register() {
  //   const body = {
  //     UserName : this.formModel.value.UserName,
  //     FullName : this.formModel.value.FullName,
  //     Email : this.formModel.value.Email,
  //     PassWord : this.formModel.value.PassWord,
  //     ConfirmPassword : this.formModel.value.ConfirmPassword
  //   };
  //   return this.http.post(this.baseURL, body);
  // }

  // getUserProfile() {
  //   const tokenHeader = new HttpHeaders({AuthHeader: 'bearer' + localStorage.getItem('token')});
  //   return this.http.get(this.baseURL, {headers: tokenHeader});
  // }

}
