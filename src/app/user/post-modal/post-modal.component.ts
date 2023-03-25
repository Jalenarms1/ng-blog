import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';
import { BlogPostService } from 'src/services/blog-post.service';
import { Router } from '@angular/router';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-post-modal',
  templateUrl: './post-modal.component.html',
  styleUrls: ['./post-modal.component.css']
})
export class PostModalComponent implements OnInit {
  postTitle: string = '';
  postBody: string = '';
  @Input() showPostModal: boolean = true
  @Output() toggleModal = new EventEmitter<void>()
  constructor(public postService: BlogPostService, private router: Router, private userService: UserService) { }

  ngOnInit(): void {
  }

  
  closeModal() {
    this.toggleModal.emit();
  }

  submitPost() {
    this.postService.addPost(this.postTitle, this.postBody)?.subscribe(res => {
      this.postService.postError = false
      this.postService.getPosts()
      this.userService.getMe()
      this.closeModal()
      
    })
  }
  

}
