import { Component, OnInit } from '@angular/core';
import { BlogPostService } from 'src/services/blog-post.service';
import { DateFormatService } from 'src/services/date-format.service';
import { Post, User } from 'src/app/models';
import { Subscription } from 'rxjs';
import { JwtServiceService } from 'src/services/jwt.service';
import { UserService } from 'src/services/user.service';


@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})
export class ArticlesComponent implements OnInit {
  posts: Post[] = [];
  user: User = {} as User
  loggedIn: boolean = false
  private isAuthenticatedSubscription: Subscription;

  constructor(private postService: BlogPostService, private dateFormat: DateFormatService, private jwt: JwtServiceService, private userService: UserService) { 
    this.isAuthenticatedSubscription = this.jwt.isAuthenticated$.subscribe((authenticated: boolean) => {
      this.loggedIn = authenticated;
    });
  }

  ngOnInit(): void {
    this.postService.getPosts().subscribe(res => {
      res = res.map(item => {
        const formattedDate = this.dateFormat.dateAndTime(item.createdAt)

        return {...item, createdAt: formattedDate as string}
      })
      console.log("res", res);

      this.posts = res;
      console.log("posts", this.posts);

    })
    this.userService.getMe().subscribe(res => {
      this.user = res
    })

    const token = this.jwt.isAuthenticated();
    if(token) {
      this.loggedIn = true
    } else {
      this.loggedIn = false
    }
  }

  

}
