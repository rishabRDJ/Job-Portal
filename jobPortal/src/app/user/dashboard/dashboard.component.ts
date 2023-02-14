import { UserService } from './../service/user.service';
import { JobPostingService } from './../../admin/service/job-posting.service';
import { JobPost } from './../../admin/model/job-post';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  posting$!: Observable<JobPost[]>;
  skillInput: string;
  locationInput: string;

  constructor( public jobPostService: JobPostingService,
    private route: ActivatedRoute, private router: Router, public userService : UserService) {
    this.skillInput = "";
    this.locationInput = "";
  }

  ngOnInit(): void {
    // localStorage.removeItem("token");
    localStorage.removeItem("searchToken");
    localStorage.removeItem("searchItem");
    localStorage.setItem("profile", "true");
    this.posting$ = this.jobPostService.latestJobs();
  }

  search() {
    if (!this.skillInput && !this.locationInput) {
    this.router.navigate(['dashboard/jobs'])
    }
    else if (!this.skillInput) {
      localStorage.setItem('searchToken', 'location');
      localStorage.setItem('searchItem', this.locationInput);
      this.router.navigate(['dashboard/jobs']);
    } else if (!this.locationInput) {
      localStorage.setItem('searchToken', 'keyword');
      localStorage.setItem('searchItem', this.skillInput);
      this.router.navigate(['dashboard/jobs']);
    } else {
      // let location = this.locationInput;
      // let skill = this.skillInput;
      localStorage.setItem('searchToken', 'both');
      const search= [this.skillInput, this.locationInput];
      localStorage.setItem("searchItem", JSON.stringify(search));
      this.router.navigate(['dashboard/jobs']);
    }
  }

  onImageClick(companyName: string) {
    localStorage.setItem('searchToken','compName');
    localStorage.setItem('searchItem', companyName);
    this.router.navigate(['dashboard/jobs']);
  }
}
