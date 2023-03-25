import { Component, OnInit, Input,  EventEmitter, Output } from '@angular/core';
import { JwtServiceService } from '../../services/jwt.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.css']
})
export class LoginModalComponent implements OnInit {
  @Input() showLoginModal: boolean = true 
  @Output() closed = new EventEmitter<void>()
  showLogin: string = 'login';
  username: string = '';
  password: string = '';
  confirmPassword: string = '';
  imageData: string = ''
  randImage: boolean = false
  passwordsDoNotMatch: boolean = true;
  currentFormClass: string = 'bg-indigo-500 shadow-inner shadow-zinc-900 w-[75px] p-1  text-zinc-100 font-semibold';
  hiddenFormClass: string = 'bg-zinc-700 w-[75px] p-1  text-zinc-400';
  isAuthenticated: boolean = false;
  
  constructor(public userService: UserService, private jwtService: JwtServiceService) { }

  ngOnInit(): void {
    this.jwtService.isAuthenticated$.subscribe((authenticated: boolean) => {
      this.isAuthenticated = authenticated;
    });
  }

  setShowForm(prop: string) {
    this.showLogin = prop
  }

  closeModal() {
    this.closed.emit();
  }

  checkPasswordMatch() {
    if (this.password !== this.confirmPassword) {
      this.passwordsDoNotMatch = true;
    } else {
      this.passwordsDoNotMatch = false;
    }
  }

  submitSignUp() {
    if(this.password !== this.confirmPassword) return;

    if(this.randImage) {
      this.imageData = 'https://picsum.photos/600/400/?random'
    }
    
    this.userService.addUser(this.username, this.password, this.imageData).subscribe(res => {
      this.jwtService.saveToken(res.token)
      this.jwtService.isAuthenticated()
      this.closeModal();
    })
  }

  submitLogin() {
    
    this.userService.login(this.username, this.password).subscribe(res => {
      console.log(res);
      
      if(res.token){
        this.jwtService.saveToken(res.token)
        this.jwtService.isAuthenticated()
        this.closeModal()
      }
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
        this.imageData = dataURL
        // Do something with the data URL
      };
    }
  }

  
}
