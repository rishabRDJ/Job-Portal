import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { JobDetailsComponent } from './../admin/job-details/job-details.component';
import { JobListComponent } from './../admin/job-list/job-list.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: "",
    component: DashboardComponent
    // component: UserDashboardComponent
    // component: RegisterComponent
  },
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "all-jobs",
    component: JobListComponent
  },
  {
    path: "all-jobs/job-details",
    component: JobDetailsComponent
  },
  {
    path: "job-details",
    component: JobDetailsComponent
  },
  {
    path: "registration",
    component: RegisterComponent
  },
  {
    path: "jobs",
    component: JobListComponent
  },
  {
    path: "jobs/job-details",
    component: JobDetailsComponent
  },
  {
    path: "profile",
    component: UserDashboardComponent
  },
  {
    path: "profile/job-details",
    component: JobDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
