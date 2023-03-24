import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtServiceService } from './jwt.service';
import { Post, PostResponse } from '../app/models';
import { environment } from 'src/environments/environment';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class BlogPostService {

  constructor(private http: HttpClient, private jwt: JwtServiceService, ) { }

  addPost(title: string, body: string) {
    if(!this.jwt.isAuthenticated()) return ;
    const post = {
      title,
      body
    }

    return this.http.post<Post>(`${environment.apiUrl}/posts`, post)
  }

  getPosts() {
    return this.http.get<Post[]>(`${environment.apiUrl}/posts`)
  }

  getPost(id: string) {
    return this.http.get<Post>(`${environment.apiUrl}/posts/${id}`)
  }


}
