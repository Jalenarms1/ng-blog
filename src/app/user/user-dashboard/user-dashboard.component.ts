import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models';
import { UserService } from 'src/app/user.service';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { JwtServiceService } from 'src/app/jwt.service';


@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {
  user: User = {} as User;
  constructor(private userService: UserService, private router: Router, private jwtService: JwtServiceService) { }

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
      
      
      this.user = res
      console.log(this.user);
    })
  }

}
