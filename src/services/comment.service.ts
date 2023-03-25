import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { Comment, Post } from 'src/app/models';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  commentError: string = ''
  constructor(private http: HttpClient) { }

  addComment(body: string, postId: string) {
    const comment = {
      body,
      postId
    }

    return this.http.post<Comment>(`${environment.apiUrl}/comments`, comment).pipe(
      catchError((error) => {
        console.log(error);
        this.commentError = postId
        return throwError(() => new Error('Empty value'))
      })
    );
  }

  updateComment(id: string, body: string) {
    const comment = {
      id,
      body
    }

    return this.http.post<Comment>(`${environment.apiUrl}/comments/modify`, comment)
  }

  deletePost(id: string) {
    return this.http.delete(`${environment.apiUrl}/comments/${id}`)
  }
}
