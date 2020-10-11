import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/_Models/user';
import { AdminService } from 'src/app/_shared/admin.service';
import { AlertifyService } from 'src/app/_shared/alertify.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { RolesModalComponent } from '../roles-modal/roles-modal.component';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit {
users: User[];
bsmodalRef: BsModalRef;
  constructor(private admin: AdminService, private alertify: AlertifyService,
              private modalService: BsModalService) { }

  ngOnInit() {
    this.getUsersWithRoles();
  }

  getUsersWithRoles() {
    this.admin.getUsersWithRoles().subscribe((users: User[]) => {
      this.users = users;
    }, err => {
      this.alertify.error('there is a problem loading roles' + err);
    });
  }

  editRoleModals(user: User) {
    const initialState = {
      user,
      roles: this.getRolesArray(user)
    };
    this.bsmodalRef = this.modalService.show(RolesModalComponent, {initialState});
    this.bsmodalRef.content.updateSelectedRoles.subscribe((values) => {
      const rolesToUpdate = {
        roleNames: [...values.filter(el => el.checked === true).map(el => el.name)]
      };
      if (rolesToUpdate) {
        this.admin.updateRoles(user, rolesToUpdate).subscribe(() => {
          user.roles = [...rolesToUpdate.roleNames];
          this.alertify.success('roles edited successfully');
        }, err => {
          this.alertify.error('failed to edit Roles' + err);
        });
      }
    });
  }

  private getRolesArray(user) {
    const roles = [];
    const userRoles = user.roles;
    const availableRoles: any[] = [
      {name: 'Admin', value: 'Admin'},
      {name: 'Moderator', value: 'Moderator'},
      {name: 'Member', value: 'Member'},
      {name: 'Vip', value: 'Vip'}
    ];
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < availableRoles.length; i++) {
      let isMatch = false;
      // tslint:disable-next-line: prefer-for-of
      for (let j = 0; j < userRoles.length; j++) {
        if (availableRoles[i].name === userRoles[j]) {
          isMatch = true;
          availableRoles[i].checked = true;
          roles.push(availableRoles[i]);
          break;
        }
      }
      if (!isMatch) {
        availableRoles[i].checked = false;
        roles.push(availableRoles[i]);
      }
    }
    return roles;
  }

}
