import { Component, OnInit } from '@angular/core';
import { AlertifyService } from 'src/app/_shared/alertify.service';
import { User } from 'src/app/_Models/user';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.css']
})
export class ListsComponent implements OnInit {
  likesParam: string;
  user: User[];
  constructor(private alertify: AlertifyService, private rout: ActivatedRoute) { }

  ngOnInit(): void {
    this.rout.data.subscribe(data => {
      this.user = data.users;
      // this.LoadUsers();
    });
  }
  loadUsers() {
    this.alertify.success('yeah');
  }
}
