import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtServiceService } from './jwt.service';
import { Post, PostResponse } from '../app/models';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, catchError, throwError } from 'rxjs';
import { DateFormatService } from './date-format.service';


@Injectable({
  providedIn: 'root'
})
export class BlogPostService {
  posts: Post[] | null = null;
  postError: boolean = false
  constructor(private http: HttpClient, private jwt: JwtServiceService, private dateFormat: DateFormatService) { }

  addPost(title: string, body: string) {
    if(!this.jwt.isAuthenticated()) return ;
    const post = {
      title,
      body
    }

    return this.http.post<Post>(`${environment.apiUrl}/posts`, post).pipe(
      catchError((error) => {
        this.postError = true
        return throwError(() => new Error('Empty value'))
      })
    );
  }

  getPosts() {
    return this.http.get<Post[]>(`${environment.apiUrl}/posts`).subscribe(res => {
      res = res.map(item => {
        const formattedDate = this.dateFormat.dateAndTime(item.createdAt)

        return {...item, createdAt: formattedDate as string}
      })
      this.posts = res
    })
  }

  getPost(id: string) {
    return this.http.get<Post>(`${environment.apiUrl}/posts/${id}`)
  }

  updatePost(id: string, title: string, body: string) {
    const post = {
      id,
      title,
      body
    }

    return this.http.post<Post>(`${environment.apiUrl}/posts/modify`, post)
  }

  deletePost(id: string) {
    return this.http.delete(`${environment.apiUrl}/posts/${id}`)
  }


}
