import { Component, OnInit } from '@angular/core';
import { Post, PostResponse, User, UserResponse } from 'src/app/models';
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
  constructor(private userService: UserService, private router: Router, private jwtService: JwtServiceService, private dateFormat: DateFormatService) { }

  ngOnInit(): void {
    if(!this.jwtService.isAuthenticated()){
      this.router.navigateByUrl("/")
      return
    }
    this.userService.getMe().subscribe(res => {
      console.log(res);
      
      const date = new Date(res.createdAt);
      const day = ('0' + date.getDate()).slice(-2);
      const month = ('0' + (date.getMonth() + 1)).slice(-2);
      const year = date.getFullYear();
      res.createdAt = `${month}/${day}/${year}`
      res.comments = res.comments?.map(item => {
        return {...item, createdAt: this.dateFormat.dateAndTime(item.createdAt) as string}
      })
      
      this.user = res
      res.posts = res.posts.map(item => {
        const formattedDate = this.dateFormat.dateAndTime(item.createdAt)

        return {...item, createdAt: formattedDate as string}
      })
      this.posts = res.posts
      console.log(this.posts);
    })
  }

  directTo(path: string) {
    this.router.navigateByUrl(path)
  }
  

  

}
