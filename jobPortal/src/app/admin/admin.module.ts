import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AddJobComponent } from './add-job/add-job.component';
import { JobListComponent } from './job-list/job-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AdminNavbarComponent } from './admin-navbar/admin-navbar.component';
import { EditJobComponent } from './edit-job/edit-job.component';
import { JobDetailsComponent } from './job-details/job-details.component';


@NgModule({
  declarations: [ AddJobComponent, JobListComponent, AdminLoginComponent, AdminNavbarComponent, EditJobComponent, JobDetailsComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [JobListComponent]
})
export class AdminModule { }
