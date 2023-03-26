import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { CommentService } from 'src/services/comment.service';
import { DateFormatService } from 'src/services/date-format.service';
import { Post, User } from 'src/app/models';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-comment-box',
  templateUrl: './comment-box.component.html',
  styleUrls: ['./comment-box.component.css']
})
export class CommentBoxComponent implements OnInit {
  comment: string = '';
  @Input() loggedIn: boolean = false
  @Input() user: User | null = {} as User
  @Input() post: Post = {} as Post
  @Output() getPosts: EventEmitter<void> = new EventEmitter<void>();
  constructor(public commentService: CommentService, private router: Router, private dateFormat: DateFormatService, public userService: UserService) { }

  ngOnInit(): void {
    this.post.comments = this.post.comments?.map(item => {
      return {...item, createdAt: this.dateFormat.dateAndTime(item.createdAt as string) as string}
    })
    this.user = this.userService.user
    
    
  }

  submitComment() {
    this.commentService.addComment(this.comment, this.post.id).subscribe(res => {
      this.commentService.commentError = ''
      this.getPosts.emit()
      // location.reload()
    })
  }

  removeErrorOnChange() {
    this.commentService.commentError = ''
  }

  directTo(path:string) {
    this.router.navigateByUrl(path)
  }



}
