import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from 'src/app/models';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  @Input() showEditUserModal: boolean = true
  @Output() toggleModal = new EventEmitter<void>()
  // user: User = {} as User
  username: string = '';
  imageUrl: string = '';
  currentPassword: string = '';
  newPassword: string = '';
  confirmNewPassword: string = '';
  passwordsDoNotMatch: boolean = false;
  constructor(public userService: UserService) { }

  ngOnInit(): void {
    // this.userService.getMe().subscribe(res => {
    //   this.user = res
    //   this.username = this.user.username
      
    // })
    this.userService.getMe()
  }

  closeModal() {
    this.toggleModal.emit();
  }

  checkPasswordMatch() {
    if (this.newPassword !== this.confirmNewPassword) {
      this.passwordsDoNotMatch = true;
    } else {
      this.passwordsDoNotMatch = false;
    }
  }

  submitUserNameImageUpd() {
    console.log("Hello");
    
    if(this.imageUrl === ''){
      this.imageUrl = this.userService.user?.image as string
    }
    this.userService.updateUsernameAndImage(this.username, this.imageUrl).subscribe(res => {
      location.reload()
      
    })
  }

  submitPasswordUpd() {
    if(this.newPassword !== this.confirmNewPassword) return;
    this.userService.updatePassword(this.currentPassword, this.newPassword).subscribe(res => {
      location.reload()
    })
  }

  onFileSelected(event: Event) {
    const fileInput = event.target as HTMLInputElement;
    const file: File = fileInput?.files?.[0] as File

    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        
        const dataURL = reader.result as string;
        this.imageUrl = dataURL
        // Do something with the data URL
      };
    }
  }


  

}
