import { Component, OnInit, Input,Output,EventEmitter } from '@angular/core';
import { BlogPostService } from 'src/services/blog-post.service';
import { CommentService } from 'src/services/comment.service';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-delete-comment',
  templateUrl: './delete-comment.component.html',
  styleUrls: ['./delete-comment.component.css']
})
export class DeleteCommentComponent implements OnInit {

  @Input() commentId: string = '';
  @Output() toggleDeleteCommentModal = new EventEmitter<Event>()

  constructor(private postService: BlogPostService, private userService: UserService, private commentService: CommentService) { }

  ngOnInit(): void {
  }

  closeModal(event: Event) {
    this.toggleDeleteCommentModal.emit(event)
  }

  confirmDelete(event: Event) {
    this.commentService.deletePost(this.commentId).subscribe(res => {
      this.userService.getMe();
      this.closeModal(event);
      
    })
  }

}
