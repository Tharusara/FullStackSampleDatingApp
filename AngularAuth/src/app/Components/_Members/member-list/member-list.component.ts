import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/_Models/user';
import { UserService } from 'src/app/_shared/user.service';
import { AlertifyService } from 'src/app/_shared/alertify.service';
import { ActivatedRoute } from '@angular/router';
import { Pagination } from 'src/app/_Models/Pagination';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {
users: User[];
pagination: Pagination[];
  constructor(private userService: UserService, private alertify: AlertifyService, private rout: ActivatedRoute) { }

  ngOnInit() {
    this.rout.data.subscribe(data => {
      this.users = data.users;
      // this.LoadUsers();
    });
  }

  // pageChanged(event: any): void {
  //   this.pagination.currentPage = event.page;
  //   this.LoadUsers();
  // }

  // LoadUsers() {
  //   this.userService.getUsers(this.pagination.currentPage,this.pagination.itemsPerPage)
  //   .subscribe((res:PaginatedResult<User[]>) => {
  //     this.users = res.result;
  //     this.pagination =res.Pagination;
  //   }, error => {
  //     this.alertify.error(error);
  //   });
  // }

}
