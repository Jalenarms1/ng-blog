import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Post, Comment } from 'src/app/models';
import { BlogPostService } from 'src/services/blog-post.service';
import { CommentService } from 'src/services/comment.service';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-edit-comment',
  templateUrl: './edit-comment.component.html',
  styleUrls: ['./edit-comment.component.css']
})
export class EditCommentComponent implements OnInit {

  body: string = '';
  commentId: string = ''
  @Input() comment: Comment = {} as Comment
  @Output() toggleCommentModal = new EventEmitter<Event>()
  constructor(private blogService: BlogPostService, private userService: UserService, private commentService: CommentService) { }

  ngOnInit(): void {
    this.commentId = this.comment.id
    this.body = this.comment.body
    console.log(this.comment);
    

  }

  closeModal(event: Event) {
    this.toggleCommentModal.emit(event);
  }

  submitCommentUpdate(event: Event) {
    this.commentService.updateComment(this.commentId, this.body).subscribe(res => {
      this.userService.getMe()
      this.closeModal(event)
      
    })
  }

}
