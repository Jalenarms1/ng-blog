import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/models';

@Component({
  selector: 'app-user-nav',
  templateUrl: './user-nav.component.html',
  styleUrls: ['./user-nav.component.css']
})
export class UserNavComponent implements OnInit {
  @Input() user: User = {} as User
  constructor() { }

  ngOnInit(): void {
  }

}
