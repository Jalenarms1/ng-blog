import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-hero-header',
  templateUrl: './hero-header.component.html',
  styleUrls: ['./hero-header.component.css']
})
export class HeroHeaderComponent implements OnInit {
  showLoginModal: boolean = false;
  @Input() loggedIn: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  toggleModal() {
    this.showLoginModal = !this.showLoginModal
  }

  onLoginModalClosed() {
    this.showLoginModal = false;
  }

}
