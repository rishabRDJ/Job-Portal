import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { JobPost } from '../model/job-post';
import { JobPostingService } from '../service/job-posting.service';

@Component({
  selector: 'app-edit-job',
  templateUrl: './edit-job.component.html',
  styleUrls: ['./edit-job.component.scss']
})
export class EditJobComponent implements OnInit, OnDestroy {

  id: string;
  public jobDetail!: JobPost;
  jobPostSub$!: Subscription

  editJobForm = new FormGroup({
    jobId: new FormControl("", [Validators.required]),
    jobTitle: new FormControl("", [Validators.required]),
    postDate: new FormControl("", [Validators.required]),
    role: new FormControl("", [Validators.required]),
    responsibility: new FormControl("", [Validators.required]),
    compName: new FormControl("", [Validators.required]),
    exp: new FormControl("", [Validators.required]),
    salaryR: new FormControl("", [Validators.required]),
    noPos: new FormControl("", [Validators.required]),
    location: new FormControl("", [Validators.required]),
    skills: new FormControl("", [Validators.required]),
    degree: new FormControl("", [Validators.required]),
    compInfo: new FormControl("", [Validators.required]),
    empType: new FormControl("", [Validators.required]),
    indType: new FormControl("", [Validators.required]),
    keyword: new FormControl("", [Validators.required]),
    jobDesc: new FormControl("", [Validators.required])
  });

  constructor(private jobPostService: JobPostingService, private route: ActivatedRoute, private router: Router) {
    this.id = "";
  }

  ngOnInit() {
    // this.posting$ = this.jobPostService.getJobs();
    // this.id = this.route.snapshot.paramMap.get("id");
    this.route.queryParamMap.subscribe( (params:any) => {
      this.id = params?.params?._id;
    });
    this.jobPostSub$ = this.jobPostService
    .getDetails(this.id)
    .subscribe(jobPost => (
    this.jobDetail = jobPost
  ));
  }

  editJob(){
    if(this.editJobForm.valid){
      this.jobPostService.editJob(this.editJobForm.value, this.id).subscribe( res => {
        this.editJobForm.reset();
        this.router.navigate(["/admin/job-list"]);
      });
    }
  }

  ngOnDestroy() {
    this.jobPostSub$.unsubscribe();
  }

}
