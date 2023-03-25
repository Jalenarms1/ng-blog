import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Post } from 'src/app/models';
import { BlogPostService } from 'src/services/blog-post.service';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css']
})
export class EditPostComponent implements OnInit {
  title: string = '';
  body: string = '';
  postId: string = ''
  @Input() post: Post = {} as Post
  @Output() toggleModal = new EventEmitter<Event>()
  constructor(private blogService: BlogPostService, private userService: UserService) { }

  ngOnInit(): void {
    this.postId = this.post.id
    this.title = this.post.title
    this.body = this.post.body
  }

  closeModal(event: Event) {
    this.toggleModal.emit(event);
  }

  submitPostUpdate(event: Event) {
    this.blogService.updatePost(this.postId, this.title, this.body).subscribe(res => {
      this.userService.getMe()
      this.closeModal(event)
      
    })
  }

}
