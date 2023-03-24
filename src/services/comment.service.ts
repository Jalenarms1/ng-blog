import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private http: HttpClient) { }

  addComment(body: string, postId: string) {
    const comment = {
      body,
      postId
    }

    return this.http.post<Comment>(`${environment.apiUrl}/comments`, comment)
  }
}
