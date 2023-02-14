import { JobDetailsComponent } from './job-details/job-details.component';
import { EditJobComponent } from './edit-job/edit-job.component';
import { JobListComponent } from './job-list/job-list.component';
import { AddJobComponent } from './add-job/add-job.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: "",
    component: AdminLoginComponent
  },
  {
    path: "add-job",
    component: AddJobComponent
  },
  {
    path: "job-list/job-details",
    component: JobDetailsComponent
  },
  {
    path: "job-list",
    component: JobListComponent
  },
  {
    path: "edit-job",
    component: EditJobComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
