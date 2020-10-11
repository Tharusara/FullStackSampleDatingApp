import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/_shared/user.service';
import { AlertifyService } from 'src/app/_shared/alertify.service';
import { ActivatedRoute } from '@angular/router';
import { Message } from 'src/app/_Models/message';
import { AuthService } from 'src/app/_shared/auth.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {
messages: Message[];
messageContainer = 'Unread';
  constructor(private userService: UserService, private alertify: AlertifyService,
              private rout: ActivatedRoute, private auth: AuthService) { }

  ngOnInit() {
    this.rout.data.subscribe(data => {
      this.messages = data.messages.result;
    });
  }

  loadMessages() {
    this.userService.getMessages(this.auth.decodedToken.nameid, this.messageContainer).subscribe(res => {
      this.messages = res;
    }, error => {
      this.alertify.error('error recieving messages' + error);
    });
  }
  deleteMessages(id: number) {
    this.alertify.confirm('Are you sure u want to delte this message', () => {
      this.userService.DeleteMessage(id, this.auth.decodedToken.nameid).subscribe(() => {
        this.messages.splice(this.messages.findIndex(m => m.id === id), 1);
        this.alertify.success('message is successfully deleted');
      }, err => {
        this.alertify.error('failed to delete' + err);
      });
    });
  }

}
