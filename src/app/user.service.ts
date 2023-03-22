import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthUserResponse, User } from './models';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  apiUrl: string = 'https://localhost:7083/api'

  constructor(private http: HttpClient) { }

  addUser(username: string, password: string, image: string) {
    const user = {
      username,
      password,
      image
    }

    return this.http.post<AuthUserResponse>(`${this.apiUrl}/auth/signup`, user)
  }

  login(username: string, password: string) {
    const user = {
      username,
      password
    }

    return this.http.post<AuthUserResponse>(`${this.apiUrl}/auth/login`, user)
  }

  getMe() {
    return this.http.get<User>(`${this.apiUrl}/auth/user`)
  }
}
