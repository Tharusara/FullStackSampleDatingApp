import { Component, OnInit, Input } from '@angular/core';
import { Message } from 'src/app/_Models/message';
import { UserService } from 'src/app/_shared/user.service';
import { AlertifyService } from 'src/app/_shared/alertify.service';
import { AuthService } from 'src/app/_shared/auth.service';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-member-messages',
  templateUrl: './member-messages.component.html',
  styleUrls: ['./member-messages.component.css']
})
export class MemberMessagesComponent implements OnInit {
@Input() recipientId: number;
messages: Message[];
newMessage: any = {};

  constructor(private userService: UserService, private alertify: AlertifyService,
              private auth: AuthService) { }

  ngOnInit(): void {
    this.loadMessages();
  }
  loadMessages() {
    const currentUserId = +this.auth.decodedToken.nameid;
    this.userService.getMessagesThread(this.auth.decodedToken.nameid, this.recipientId)
    .pipe(
      tap(messages => {
        // tslint:disable-next-line: prefer-for-of
        for (let i = 0; i < messages.length; i++) {
          if (messages[i].isRead === false && messages[i].recipientId === currentUserId) {
            this.userService.MrakAsRead(currentUserId, messages[i].id);
          }

        }
      })
    )
    .subscribe(messages => {
      this.messages = messages;
    }, err => {
      this.alertify.error('error' + err);
    });
  }
  sendMessage() {
    this.newMessage.recipientId = this.recipientId;
    this.userService.sendMessage(this.auth.decodedToken.nameid, this.newMessage)
    .subscribe((message: Message) => {
      this.messages.unshift(message);
      this.newMessage = '';
    }, err => {
      this.alertify.error('failed to send the message' + err);
    });
  }
}
