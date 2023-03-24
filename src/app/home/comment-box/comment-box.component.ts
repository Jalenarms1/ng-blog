import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { CommentService } from 'src/services/comment.service';
import { DateFormatService } from 'src/services/date-format.service';
import { Post, User } from 'src/app/models';

@Component({
  selector: 'app-comment-box',
  templateUrl: './comment-box.component.html',
  styleUrls: ['./comment-box.component.css']
})
export class CommentBoxComponent implements OnInit {
  comment: string = '';
  @Input() loggedIn: boolean = false
  @Input() user: User = {} as User
  @Input() post: Post = {} as Post
  constructor(private commentService: CommentService, private router: Router, private dateFormat: DateFormatService) { }

  ngOnInit(): void {
    this.post.comments = this.post.comments?.map(item => {
      return {...item, createdAt: this.dateFormat.dateAndTime(item.createdAt as string) as string}
    })
  }

  submitComment() {
    this.commentService.addComment(this.comment, this.post.id).subscribe(res => {
      location.reload()
    })
  }

  directTo(path:string) {
    this.router.navigateByUrl(path)
  }

}
