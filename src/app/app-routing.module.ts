import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponentComponent } from './home/home-component/home-component.component';
import { UserDashboardComponent } from './user/user-dashboard/user-dashboard.component';
import { ViewPostComponent } from './view-post/view-post.component';

const routes: Routes = [
  {
    path: '', component: HomeComponentComponent
  },
  {
    path: 'user', component: UserDashboardComponent
  },
  {
    path: 'posts/:id', component: ViewPostComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
