import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../_shared/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: []
})
export class HomeComponent implements OnInit {
registerMode = false;
  constructor(private service: AuthService) { }

  ngOnInit() {
  }

  registerToggle(){
    this.registerMode =true;
  }
  cancelRegisterMode(registerMode:boolean){
    this.registerMode = registerMode;
  }
}
