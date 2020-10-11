import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../_shared/auth.service';
import { AlertifyService } from '../_shared/alertify.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { User } from '../_Models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
user: User;
registerForm: FormGroup;
bsConfig: Partial<BsDatepickerConfig>;
@Output() cancelRegister = new EventEmitter();
  constructor(private authService: AuthService, private alertyfy: AlertifyService,
              private fb: FormBuilder, private route: Router) { }

  ngOnInit() {
    this.bsConfig = {
      containerClass: 'theme-red'
    },
    this.createRegisterForm();
  }
  createRegisterForm() {
    this.registerForm = this.fb.group({
      gender : ['male'],
      username : ['', Validators.required],
      knownAs : ['', Validators.required],
      dateOfBirth : [null, Validators.required],
      city : ['', Validators.required],
      country : ['', Validators.required],
      password : ['', [Validators.required, Validators.minLength(4), Validators.maxLength(15)]],
      confirmPassword: ['', Validators.required]
    }, {validator: this.passwordMatchValidator});
  }

  passwordMatchValidator(g: FormGroup) {
    return g.get('password').value === g.get('confirmPassword').value ? null : {missmatch: true};
  }

  register() {
    if (this.registerForm.valid) {
      this.user = Object.assign({}, this.registerForm.value);
      this.authService.register(this.user).subscribe(() => {
        this.alertyfy.success('registered successful');
      }, error => {
        this.alertyfy.error(error);
      }, () => {
        this.authService.login(this.user).subscribe(() => {
          this.route.navigate(['/members']);
        });
      });
    }
  }

  cancel() {
    this.cancelRegister.emit(false);
    this.alertyfy.message('canceled');
  }

}
