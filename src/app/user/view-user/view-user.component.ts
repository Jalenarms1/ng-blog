import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Post, User } from 'src/app/models';
import { DateFormatService } from 'src/services/date-format.service';
import { JwtServiceService } from 'src/services/jwt.service';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.css']
})
export class ViewUserComponent implements OnInit {
  userId: string = '';
  userInView: User = {} as User
  userPosts: Post[] = [];
  constructor(private router: ActivatedRoute, public userService: UserService, public jwt: JwtServiceService, private dateFormat: DateFormatService) { }

  ngOnInit(): void {
    this.router.params.subscribe(param => {
      this.userId = param['id']
    })
    this.reloadUserData()

  }
  
  reloadUserData() {
    this.userService.findUser(this.userId).subscribe(res => {
      console.log(res);
      
      res = res.map(item => {
        const formattedDate = this.dateFormat.dateAndTime(item.createdAt)
        
        return {...item, createdAt: formattedDate as string}
      })
      this.userInView = res[0].user as User
      this.userPosts = res
    })

  }



}
