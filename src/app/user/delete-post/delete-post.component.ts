import { Component, OnInit,Output, EventEmitter, Input } from '@angular/core';
import { BlogPostService } from 'src/services/blog-post.service';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-delete-post',
  templateUrl: './delete-post.component.html',
  styleUrls: ['./delete-post.component.css']
})
export class DeletePostComponent implements OnInit {
  @Input() postId: string = '';
  @Output() toggleDeleteModal = new EventEmitter<Event>()

  constructor(private postService: BlogPostService, private userService: UserService) { }

  ngOnInit(): void {
  }

  closeModal(event: Event) {
    this.toggleDeleteModal.emit(event)
  }

  confirmDelete(event: Event) {
    this.postService.deletePost(this.postId).subscribe(res => {
      this.userService.getMe();
      this.closeModal(event);
      
    })
  }

}
