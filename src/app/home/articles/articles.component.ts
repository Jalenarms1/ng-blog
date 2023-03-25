import { Component, OnInit } from '@angular/core';
import { BlogPostService } from 'src/services/blog-post.service';
import { DateFormatService } from 'src/services/date-format.service';
import { Subscription } from 'rxjs';
import { JwtServiceService } from 'src/services/jwt.service';
import { UserService } from 'src/services/user.service';


@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})
export class ArticlesComponent implements OnInit {
  
  loggedIn: boolean = false
  private isAuthenticatedSubscription: Subscription;

  constructor(public postService: BlogPostService, private dateFormat: DateFormatService, private jwt: JwtServiceService, public userService: UserService) { 
    this.isAuthenticatedSubscription = this.jwt.isAuthenticated$.subscribe((authenticated: boolean) => {
      this.loggedIn = authenticated;
    });
  }

  ngOnInit(): void {
    this.postService.getPosts()
    
    this.userService.getMe()

    const token = this.jwt.isAuthenticated();
    if(token) {
      this.loggedIn = true
    } else {
      this.loggedIn = false
    }
  }

  

  

}
