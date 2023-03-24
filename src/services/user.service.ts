import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthUserResponse, User, UserResponse } from '../app/models';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {


  constructor(private http: HttpClient) { }

  addUser(username: string, password: string, image: string) {
    const user = {
      username,
      password,
      image
    }

    return this.http.post<AuthUserResponse>(`${environment.apiUrl}/auth/signup`, user)
  }

  login(username: string, password: string) {
    const user = {
      username,
      password
    }

    return this.http.post<AuthUserResponse>(`${environment.apiUrl}/auth/login`, user)
  }

  getMe() {
    return this.http.get<User>(`${environment.apiUrl}/auth/user`)
  }

  updateUsernameAndImage(username: string, image: string) {
    console.log("username", username);
    console.log("image", image);
    
    return this.http.post<User>(`${environment.apiUrl}/auth/user`, {username, image})
  }

  updatePassword(currentPassword: string, newPassword: string){
    const obj = {
      currentPassword,
      newPassword
    }
    return this.http.post(`${environment.apiUrl}/auth/upd-key`, obj)
  }
}
