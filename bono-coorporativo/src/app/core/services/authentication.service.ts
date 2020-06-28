import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(private httpClient: HttpClient) {}

  getHeaderWithAuthorization() {
    return {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('Authorization', this.getUser().token),
    };
  }

  getUser(): User {
    return JSON.parse(sessionStorage.getItem('user'));
  }

  saveUser(user: User) {
    sessionStorage.setItem('user', JSON.stringify(user));
  }

  closeSession() {
    sessionStorage.removeItem('user');
  }

  async authentication(user: User) {
    return await this.httpClient
      .post<User>(`${environment.api}/auth/login`, user)
      .toPromise();
  }
}
