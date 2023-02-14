import { UserDetail } from './../../user/model/user-detail';
import { UserService } from './../../user/service/user.service';
import { FormGroup } from '@angular/forms';
import { JobPost } from './../model/job-post';
import { JobPostingService } from './../service/job-posting.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-job-details',
  templateUrl: './job-details.component.html',
  styleUrls: ['./job-details.component.scss']
})
export class JobDetailsComponent implements OnInit, OnDestroy {

  id: string;
  public userDetail!: UserDetail;
  public jobDetail!: JobPost;
  userDetailSub$!: Subscription;
  jobPostingSub$!: Subscription;
  saved!: boolean;
  applied!: boolean;


  constructor(
    public jobPostService: JobPostingService, public userService: UserService,
    private route: ActivatedRoute
  ) {
    this.id = "";
  }

  ngOnInit() {
    this.route.queryParamMap.subscribe( (params:any) => {
      this.id = params?.params?._id;
    });
    this.jobPostingSub$ = this.jobPostService
      .getDetails(this.id)
      .subscribe(jobPosting => (
      this.jobDetail = jobPosting
    ));
    this.check();
    localStorage.setItem("profile", 'true');
  }

  check() {
    const savedJobs = JSON.parse(localStorage.getItem('savedJobs') || '[]');
    for (var index in savedJobs) {
      if(this.id == savedJobs[index]) {
        this.saved = true;
        break;
      }
      else this.saved = false;
    }

    const appliedJobs = JSON.parse(localStorage.getItem('appliedJobs') || '[]');
    for (var index in appliedJobs) {
      if(this.id == appliedJobs[index]) {
        this.applied = true;
        break;
      }
      else this.applied = false;
    }
  }

  saveJob() {
    if(this.saved){
      this.userService.deletesaveJob(this.id).subscribe((res) => {
        console.log('job unsaved');
      });
      var savedJobs = JSON.parse(localStorage.getItem('savedJobs') || '[]');
      for(var index in savedJobs){
        if(savedJobs[index] == this.id){
          savedJobs.splice(index, 1);
          break;
        }
      }
      localStorage.setItem("savedJobs", JSON.stringify(savedJobs) || '');
    }
    else{
      this.userService.saveJob(this.id).subscribe((res) => {
        console.log('job saved');
      });
      var savedJobs = JSON.parse(localStorage.getItem('savedJobs') || '[]');
      savedJobs.push(this.id);
      localStorage.setItem("savedJobs", JSON.stringify(savedJobs) || '');
    }
    this.saved = !this.saved;
  }

  applyJob() {
    if(this.applied){
      this.userService.deleteapplyJob(this.id).subscribe((res) => {
        console.log('job unapplied');
      });
      var appliedJobs = JSON.parse(localStorage.getItem('appliedJobs') || '[]');
      for(var index in appliedJobs){
        if(appliedJobs[index] == this.id){
          appliedJobs.splice(index, 1);
          break;
        }
      }
      localStorage.setItem("appliedJobs", JSON.stringify(appliedJobs) || '');
    }
    else{
      this.userService.applyJob(this.id).subscribe((res) => {
        console.log('job applied');
      });
      var appliedJobs = JSON.parse(localStorage.getItem('appliedJobs') || '[]');
      appliedJobs.push(this.id);
      localStorage.setItem("appliedJobs", JSON.stringify(appliedJobs) || '');
    }

    this.applied = !this.applied;
  }

  ngOnDestroy() {
    this.jobPostingSub$.unsubscribe();
    localStorage.removeItem("profile");
  }

}
