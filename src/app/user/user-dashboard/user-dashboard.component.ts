import { Component, OnInit } from '@angular/core';
import { Post, PostResponse, User, UserResponse, Comment } from 'src/app/models';
import { UserService } from 'src/services/user.service';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { JwtServiceService } from 'src/services/jwt.service';
import { DateFormatService } from 'src/services/date-format.service';


@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {
  user: User = {} as User;
  posts: Post[] = []
  selectedPost: Post = {} as Post
  showEditPostModal: boolean = false
  showDeletePostModal: boolean = false
  selectedComment: Comment = {} as Comment
  showEditCommentModal: boolean = false
  showDeleteCommentModal: boolean = false
  constructor(public userService: UserService, private router: Router, private jwtService: JwtServiceService, private dateFormat: DateFormatService) { }

  ngOnInit(): void {
    if(!this.jwtService.isAuthenticated()){
      this.router.navigateByUrl("/")
      return
    }
    this.userService.getMe()
    
    

  }
  
  directTo(path: string) {
    this.router.navigateByUrl(path)
  }

  toggleModal(event: Event, post: Post) {
    event.stopPropagation()
    this.selectedPost = post
    this.showEditPostModal = !this.showEditPostModal
  }

  toggleCommentModal(event: Event, comment: Comment) {
    event.stopPropagation()
    this.selectedComment = comment
    this.showEditCommentModal = !this.showEditCommentModal
  }

  toggleDeleteModal(event: Event, post: Post) {
    event.stopPropagation()
    this.selectedPost = post
    this.showDeletePostModal = !this.showDeletePostModal
  }

  toggleDeleteCommentModal(event: Event, comment: Comment) {
    event.stopPropagation()
    this.selectedComment = comment
    this.showDeleteCommentModal = !this.showDeleteCommentModal
  }
  
  
  

  

}
