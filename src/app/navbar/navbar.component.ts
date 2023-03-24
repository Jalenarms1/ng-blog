import { Component, OnInit } from '@angular/core';
import { JwtServiceService } from '../../services/jwt.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  showLoginModal: boolean = false;
  loggedIn: boolean = true;
  private isAuthenticatedSubscription: Subscription;

  constructor(private jwtService: JwtServiceService) {
    // subscribe to isAuthenticated$ BehaviorSubject to get authentication status
    this.isAuthenticatedSubscription = this.jwtService.isAuthenticated$.subscribe((authenticated: boolean) => {
      this.loggedIn = authenticated;
    });
  }

  ngOnInit(): void {
    const token = this.jwtService.isAuthenticated();
    if (token) {
      this.loggedIn = true;
    } else {
      this.loggedIn = false;
    }
  }

  ngOnDestroy() {
    // unsubscribe from isAuthenticated$ BehaviorSubject
    this.isAuthenticatedSubscription.unsubscribe();
  }


  toggleModal() {
    this.showLoginModal = !this.showLoginModal
  }

  onLoginModalClosed() {
    this.showLoginModal = false;
  }

  logout() {
    this.jwtService.destroyToken()
    

  }

}
