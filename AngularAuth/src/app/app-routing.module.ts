import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MemberListComponent } from './Components/_Members/member-list/member-list.component';
import { MessagesComponent } from './Components/messages/messages.component';
import { ListsComponent } from './Components/lists/lists.component';
import { AuthGuard } from './_Guards/auth.guard';
import { MemberDetailComponent } from './Components/_Members/member-detail/member-detail.component';
import { MemberEditComponent } from './Components/_Members/member-edit/member-edit.component';
import { MemberDetailResolver } from './_resolvers/member-detail.resolver';
import { MemberListResolver } from './_resolvers/member-list.resolver';
import { MemberEditResolver } from './_resolvers/member-edit.resolver';
import { PreventUnsavedChangesGuard } from './_Guards/prevent-unsaved-changes.guard';
import { MemberLikesResolver } from './_resolvers/member-likes.resolver';
import { MessageResolver } from './_resolvers/message.resolver';
import { AdminPanelComponent } from './Admin/admin-panel/admin-panel.component';



const routes: Routes = [
{path: '', component: HomeComponent},
{
  path: '',
  runGuardsAndResolvers: 'always',
  canActivate: [AuthGuard],
  children: [
    {path: 'members', component: MemberListComponent, resolve: {users: MemberListResolver}},
    {path: 'members/:id', component: MemberDetailComponent, resolve: {user: MemberDetailResolver}},
    {path: 'messages', component: MessagesComponent, resolve: {messages: MessageResolver}},
    {path: 'edit', component: MemberEditComponent, resolve: {user: MemberEditResolver}, canDeactivate: [PreventUnsavedChangesGuard]},
    // {path: 'members/edit', component: ListsComponent,
    // resolve: {user: MemberEditResolver}, canDeactivate: [PreventUnsavedChangesGuard]},
    {path: 'lists', component: ListsComponent, resolve: {users: MemberLikesResolver}},
    {path: 'admin', component: AdminPanelComponent, data: {roles: ['Admin', 'Moderator']}},

  ]
},
{path: '**', redirectTo: '', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


  // {path: '**', redirectTo: 'home', pathMatch: 'full'},
//   {path: 'user', component: UserComponent,  ListsComponent
// children: [
//   {path: 'registration', component: RegistrationComponent},
//   {path: 'login', component: LoginComponent}
// ]},
