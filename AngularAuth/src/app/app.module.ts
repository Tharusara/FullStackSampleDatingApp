import { BrowserModule, HammerGestureConfig, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { NgModule, Injectable } from '@angular/core';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthService } from './_shared/auth.service';
import { HomeComponent } from './home/home.component';
import { NavComponent } from './nav/nav.component';
import { RegisterComponent } from './register/register.component';
import { ErrorInterceptorProvider } from './_shared/error.interceptor';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ModalModule } from 'ngx-bootstrap/modal';
import { NgxGalleryModule } from 'ngx-gallery';
// import { AlertifyService } from './_shared/alertify.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ListsComponent } from './Components/lists/lists.component';
import { MemberListComponent } from './Components/_Members/member-list/member-list.component';
import { MessagesComponent } from './Components/messages/messages.component';
import { MemberCardComponent } from './Components/_Members/member-card/member-card.component';
import { JwtModule } from '@auth0/angular-jwt';
import { MemberDetailComponent } from './Components/_Members/member-detail/member-detail.component';
import { MemberEditComponent } from './Components/_Members/member-edit/member-edit.component';
import { MemberDetailResolver } from './_resolvers/member-detail.resolver';
import { MemberListResolver } from './_resolvers/member-list.resolver';
import { MemberEditResolver } from './_resolvers/member-edit.resolver';
import { PreventUnsavedChangesGuard } from './_Guards/prevent-unsaved-changes.guard';
import { AuthGuard } from './_Guards/auth.guard';
import { MemberLikesResolver } from './_resolvers/member-likes.resolver';
import { MessageResolver } from './_resolvers/message.resolver';
import { MemberMessagesComponent } from './Components/_Members/member-messages/member-messages.component';
import { AdminPanelComponent } from './Admin/admin-panel/admin-panel.component';
import { HasRoleDirective } from './_directive/has-role.directive';
import { UserManagementComponent } from './Admin/user-management/user-management.component';
import { PhotoManagementComponent } from './Admin/photo-management/photo-management.component';
import { RolesModalComponent } from './Admin/roles-modal/roles-modal.component';

export function tokenGetter() {
  return localStorage.getItem('token');
}

@Injectable() export class CustomHammerConfig extends HammerGestureConfig {
    overrides = {
      pinch : {enable: false},
      rotate: {enable:  false}
    };
}
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavComponent,
    RegisterComponent,
    ListsComponent,
    MemberListComponent,
    MessagesComponent,
    MemberCardComponent,
    MemberDetailComponent,
    MemberEditComponent,
    MemberMessagesComponent,
    AdminPanelComponent,
    HasRoleDirective,
    UserManagementComponent,
    PhotoManagementComponent,
    RolesModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    JwtModule.forRoot({
      config: {
        tokenGetter,
        allowedDomains: ['localhost:44391'],
        disallowedRoutes: ['localhost:44391/api/auth']
      }
    }),
    ReactiveFormsModule,
    BrowserAnimationsModule,
    FormsModule,
    PaginationModule.forRoot(),
    HttpClientModule,
    BsDropdownModule.forRoot(),
    BsDatepickerModule.forRoot(),
    TabsModule.forRoot(),
    ModalModule.forRoot(),
    NgxGalleryModule,
  ],
  providers: [
    AuthService,
    ErrorInterceptorProvider,
    {provide: HAMMER_GESTURE_CONFIG, useClass: CustomHammerConfig},
    MemberDetailResolver,
    MemberListResolver,
    MemberEditResolver,
    PreventUnsavedChangesGuard,
    AuthGuard,
    MemberLikesResolver,
    MessageResolver,
    // AlertifyService
  ],
  entryComponents:[
    RolesModalComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
