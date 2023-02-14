import { JobPost } from './../../admin/model/job-post';
import { JobPostingService } from './../../admin/service/job-posting.service';
import { UserService } from './../service/user.service';
import { UserDetail } from './../model/user-detail';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss']
})
export class UserDashboardComponent implements OnInit, OnDestroy {
  // [x: string]: any;

  userDetail$!: Observable<UserDetail>;
  id: string;
  savedJob$!: Observable<JobPost[]>;
  appliedJob$!: Observable<JobPost[]>;

  constructor( public userService : UserService) {
    this.id="";
    localStorage.setItem("profile",'true');
   }

  ngOnInit(): void {
    this.id = localStorage.getItem("user") || '';
    this.userDetail$ = this.userService.getDetails(this.id);
    this.savedJob$ = this.userService.getSaveJob();
    this.appliedJob$ = this.userService.getApplyJob();
  }

  tab(elementId: string) {
    (<HTMLDivElement>document.getElementById("tabContent1")).style.display = "none";
    (<HTMLDivElement>document.getElementById("tabContent2")).style.display = "none";
    (<HTMLDivElement>document.getElementById("tabContent3")).style.display = "none";
    (<HTMLDivElement>document.getElementById(elementId)).style.display = "block";
  }



  ngOnDestroy() {
    localStorage.removeItem("profile")
  }
}
