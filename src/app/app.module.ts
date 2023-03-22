import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HeroHeaderComponent } from './home/hero-header/hero-header.component';
import { HomeComponentComponent } from './home/home-component/home-component.component';
import { ArticlesComponent } from './home/articles/articles.component';
import { FooterComponent } from './footer/footer.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './auth.interceptor';
import { LoginModalComponent } from './login-modal/login-modal.component';
import { MatIconModule } from '@angular/material/icon';
import { UserNavComponent } from './user/user-nav/user-nav.component';
import { UserDashboardComponent } from './user/user-dashboard/user-dashboard.component';
import { PostModalComponent } from './user/post-modal/post-modal.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HeroHeaderComponent,
    HomeComponentComponent,
    ArticlesComponent,
    FooterComponent,
    LoginModalComponent,
    UserNavComponent,
    UserDashboardComponent,
    PostModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatIconModule,
    FormsModule
    
  ],
  exports: [MatIconModule],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
