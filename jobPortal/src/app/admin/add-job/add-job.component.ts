import { FormGroup, FormControl, Validators } from '@angular/forms';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { JobPostingService } from './../service/job-posting.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { JobPost } from '../model/job-post';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-job',
  templateUrl: './add-job.component.html',
  styleUrls: ['./add-job.component.scss']
})
export class AddJobComponent implements OnInit, OnDestroy {

  jobForm = new FormGroup({
    jobId: new FormControl("", [Validators.required, Validators.minLength(12),
                                Validators.maxLength(12), Validators.pattern('^[a-zA-Z0-9]*$')]),
    jobTitle: new FormControl("", [Validators.required, Validators.pattern('^[^s]+[-a-zA-Zs]+([-a-zA-Z]+[ ])*$')]),
    postDate: new FormControl("", [Validators.required]),
    role: new FormControl("", [Validators.required, Validators.pattern('^[^s]+[-a-zA-Zs]+([-a-zA-Z]+[.]+[ ])*$'),]),
    responsibility: new FormControl("", [Validators.required, Validators.maxLength(300)]),
    compName: new FormControl("", [Validators.required, Validators.maxLength(100)]),
    exp: new FormControl("", [Validators.required, Validators.pattern('^[0-9]*$')]),
    salaryR: new FormControl("", [Validators.required, Validators.pattern('^[0-9,]*$')]),
    noPos: new FormControl("", [Validators.required, Validators.pattern('^[0-9]*$')]),
    location: new FormControl("", [Validators.required]),
    skills: new FormControl("", [Validators.required]),
    degree: new FormControl("", [Validators.required]),
    compInfo: new FormControl("", [Validators.required]),
    empType: new FormControl("", [Validators.required]),
    indType: new FormControl("", [Validators.required]),
    keyword: new FormControl("", [Validators.required,
      // Validators.pattern('^[^s]+[-a-zA-Zs]+([-a-zA-Z0-9,]+[ ])*$')
    ]),
    jobDesc: new FormControl("", [Validators.required, Validators.maxLength(500)])
  });

  get jobId() {
    return this.jobForm.get('jobId');
  }

  get jobTitle() {
    return this.jobForm.get('jobTitle');
  }

  get postDate() {
    return this.jobForm.get('postDate');
  }

  get role() {
    return this.jobForm.get('role');
  }

  get responsibility() {
    return this.jobForm.get('responsibility');
  }

  get compName() {
    return this.jobForm.get('compName')
  }

  get exp() {
    return this.jobForm.get('exp')
  }

  get salaryR() {
    return this.jobForm.get('salaryR')
  }

  get noPos() {
    return this.jobForm.get('noPos')
  }

  get location() {
    return this.jobForm.get('location')
  }

  get skills() {
    return this.jobForm.get('skills')
  }

  get degree() {
    return this.jobForm.get('degree')
  }

  get compInfo() {
    return this.jobForm.get('compInfo')
  }

  get empType() {
    return this.jobForm.get('empType')
  }

  get indType() {
    return this.jobForm.get('indType')
  }

  get keyword() {
    return this.jobForm.get('keyword')
  }

  get jobDesc() {
    return this.jobForm.get('jobDesc')
  }

  id: string;
  public jobDetail!: JobPost;
  jobPostingSub$!: Subscription;

  constructor(
    private jobPostingService: JobPostingService,
    private router: Router,
    private route: ActivatedRoute) {
      this.id = "";
      this.route.queryParamMap.subscribe( (params:any) => {
        this.id = params?.params?._id;
      });
    }

  ngOnInit() {
    this.jobPostingSub$ = this.jobPostingService
      .getDetails(this.id)
      .subscribe(jobPosting => (
      this.jobDetail = jobPosting
    ));
  }

  ngOnDestroy() {
    this.jobPostingSub$.unsubscribe();
  }

  newJob(){
    if(this.jobForm.valid){
      this.jobPostingService.addJob(this.jobForm.value).subscribe( res =>{
        this.jobForm.reset();
        this.router.navigate(["admin/job-list"]);
      })
    }
  }

}
