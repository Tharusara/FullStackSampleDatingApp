import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from 'src/app/_Models/user';
import { UserService } from 'src/app/_shared/user.service';
import { AlertifyService } from 'src/app/_shared/alertify.service';
import { ActivatedRoute } from '@angular/router';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from 'ngx-gallery';
import { TabsetComponent } from 'ngx-bootstrap/tabs';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css']
})
export class MemberDetailComponent implements OnInit {
  @ViewChild('memberTabs', {static: true}) memberTabs: TabsetComponent;
user: User;
galleryOptions: NgxGalleryOptions[];
galleryImage: NgxGalleryImage[];

  constructor(private userService: UserService, private alertify: AlertifyService,
              private rout: ActivatedRoute) { }

  ngOnInit() {
    this.rout.data.subscribe(data => {
      this.user = data.user;
    }, err => {
      this.alertify.error('error' + err);
    });
    this.rout.queryParams.subscribe(params => {
      const selectedTab = params.tab;
      this.memberTabs.tabs[selectedTab > 0 ? selectedTab : 0].active = true;
    });
    this.galleryOptions = [
      {
        width: '500px',
        height: '500px',
        imagePercent: 100,
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide,
        preview: false
      }
    ];
    this.galleryImage = this.getImages();
  }
  // LoadUser() {
  //   this.userService.getUser(+this.rout.snapshot.params.id).subscribe((user: User) => {
  //     this.user = user;
  //   }, err => {
  //     this.alertify.error('error' + err);
  //   });
  // }

  getImages() {
    const imageUrls = [];
    if (this.user) {
      for (const photo of this.user.photos) {
        imageUrls.push({
          small: photo.Url,
          medium: photo.Url,
          big: photo.Url,
          description: photo.description
        });
      }
      return imageUrls;
    }
  }

  selectTab(tabId: number) {
    this.memberTabs.tabs[tabId].active = true;
  }
}
