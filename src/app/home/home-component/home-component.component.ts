import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { JwtServiceService } from 'src/services/jwt.service';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-home-component',
  templateUrl: './home-component.component.html',
  styleUrls: ['./home-component.component.css']
})
export class HomeComponentComponent implements OnInit {
  loggedIn: boolean = false;
  showPostModal: boolean = false;


  private isAuthenticatedSubscription: Subscription;

  constructor(private userService: UserService, private jwt: JwtServiceService) {
    this.isAuthenticatedSubscription = this.jwt.isAuthenticated$.subscribe((authenticated: boolean) => {
      this.loggedIn = authenticated;
    });


  }

  ngOnInit(): void {
    if(this.jwt.isAuthenticated()){
      this.loggedIn = true;
    } else {
      this.loggedIn = false;
    }
  }

  onPostModalClosed() {
    this.showPostModal = false
  }

  toggleModal() {
    this.showPostModal = !this.showPostModal
  }


}
