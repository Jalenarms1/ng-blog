import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { User, UserResponse } from 'src/app/models';

@Component({
  selector: 'app-user-nav',
  templateUrl: './user-nav.component.html',
  styleUrls: ['./user-nav.component.css']
})
export class UserNavComponent implements OnInit {
  @Input() user: User | null = {} as User
  showPostModal: boolean = false;
  showEditUserModal: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  onPostModalClosed() {
    this.showPostModal = false
  }

  toggleModal() {
    this.showPostModal = !this.showPostModal
  }

  onEditUserModalClosed() {
    this.showEditUserModal = false
  }

  toggleEditUserModal() {
    this.showEditUserModal = !this.showEditUserModal
  }

}
