import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { AuthUserResponse, Post, User, UserResponse } from '../app/models';
import { environment } from '../environments/environment';
import { DateFormatService } from './date-format.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  user: User = {} as User;
  userPosts: Post[] = [];
  signInError: boolean = false
  constructor(private http: HttpClient, private dateFormat: DateFormatService) { }

  addUser(username: string, password: string, image: string) {
    const user = {
      username,
      password,
      image
    }

    return this.http.post<AuthUserResponse>(`${environment.apiUrl}/auth/signup`, user).pipe(
      catchError((error) => {
        this.signInError = true
        return throwError(() => new Error('Empty value'))
      })
    );
  }

  login(username: string, password: string) {
    const user = {
      username,
      password
    }

    return this.http.post<AuthUserResponse>(`${environment.apiUrl}/auth/login`, user).pipe(
      catchError((error) => {
        this.signInError = true
        return throwError(() => new Error('Empty value'))
      })
    );
  }

  getMe() {
    return this.http.get<User>(`${environment.apiUrl}/auth/user`).subscribe(res => {
      console.log(res);
      
      const date = new Date(res.createdAt);
      const day = ('0' + date.getDate()).slice(-2);
      const month = ('0' + (date.getMonth() + 1)).slice(-2);
      const year = date.getFullYear();
      res.createdAt = `${month}/${day}/${year}`
      res.comments = res.comments?.map(item => {
        return {...item, createdAt: this.dateFormat.dateAndTime(item.createdAt) as string}
      })
      
      this.user = res
      res.posts = res.posts.map(item => {
        const formattedDate = this.dateFormat.dateAndTime(item.createdAt)
  
        return {...item, createdAt: formattedDate as string}
      })
      this.userPosts = res.posts
      console.log(this.userPosts);
    })
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

  findUser(id: string) {
    return this.http.get<Post[]>(`${environment.apiUrl}/auth/${id}`)
  }
}
