import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../_Models/user';
import { Message } from '../_Models/message';

// const httpOptions = {
//   headers: new HttpHeaders({
//     Authorization: 'Bearer ' + localStorage.getItem('token')
//   })
// };
// httpOptions
@Injectable({
  providedIn: 'root'
})
export class UserService {
 baseUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.baseUrl + 'users/');
  }
  getUser(id): Observable<User> {
    return this.http.get<User>(this.baseUrl + 'users/' + id);
  }
  UpdateUser(id: number, user: User) {
    return this.http.put(this.baseUrl + 'users/' + id, user);
  }
  sendLikes(id: number, recipientId: number) {
    return this.http.post(this.baseUrl + 'users/' + id + '/like/' + recipientId, {});
  }
  getMessages(id: number, messageContainer?): Observable<Message[]> {
    return this.http.get<Message[]>(this.baseUrl + 'users/' + id + '/messages');
  }
  getMessagesThread(id: number, recipientid: number): Observable<Message[]> {
    return this.http.get<Message[]>(this.baseUrl + 'users/' + id + '/messages/thread/' + recipientid);
  }
  sendMessage(id: number, message: Message) {
    return this.http.post(this.baseUrl + 'users/' + id + '/messages', message);
  }
  DeleteMessage(id: number, userId: Message) {
    return this.http.post(this.baseUrl + 'users/' + userId + '/messages/' + id, {});
  }

  MrakAsRead(userId: number, messageId: number) {
    return this.http.post(this.baseUrl + 'users/' + userId + '/messages/' + messageId + '/read', {})
    .subscribe();
  }

  // getUsers(page?, itemsPerPage?): Observable<PaginatedResult<User[]>> {
  //   const paginatedResult: PaginatedResult<User[]> = new PaginatedResult<User[]>();
  //   let params = new HttpParams();
  //   if (page != null && itemsPerPage != null) {
  //     params = params.append('pageNumber', page);
  //     params = params.append('pageSize', itemsPerPage);
  //   }
  //   return this.http.get<User[]>(this.baseUrl + 'users/', {observe: 'response', params}) // httpOptions
  //   .pipe(
  //     map(response => {
  //       paginatedResult.result = response.body;
  //       if (response.headers.get('pagination') != null) {
  //         paginatedResult.Pagination = JSON.parse(response.headers.get('pagination'));
  //       }
  //       return paginatedResult;
  //     })
  //   );
  // }
}
