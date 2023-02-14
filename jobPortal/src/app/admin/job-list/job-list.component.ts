import { UserService } from './../../user/service/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { JobPost } from './../model/job-post';
import { JobPostingService } from './../service/job-posting.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-job-list',
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.scss']
})
export class JobListComponent implements OnInit, OnDestroy {

  id: string;
  public jobDetail!: JobPost;
  posting$!: Observable<JobPost[]>;
  searchLocation: string;
  detail: String;

  constructor(public jobPostService: JobPostingService, public userService: UserService ,
    private route: ActivatedRoute, private router: Router) {
      this.searchLocation = "";
      this.id = "";
      this.detail = "";
  }

  ngOnInit() {
    localStorage.removeItem("profile");
    this.generateJobsList();
    // localStorage.setItem('searchBar','true');
  }

  generateJobsList() {
    const searchToken: string = localStorage.getItem("searchToken") || '';
    if(searchToken == "") this.posting$ = this.jobPostService.getJobs();
    else if(searchToken == "both") {
      const searchItems = JSON.parse(localStorage.getItem("searchItem") || '[]');
      this.posting$ = this.jobPostService.searchBoth(searchItems[0], searchItems[1]);
    }
    else {
      const searchItem: string = localStorage.getItem("searchItem") || '';
      this.posting$ = this.jobPostService.searchBy(searchToken, searchItem);
    }
  }

  removeJob(_id: any){
    if(confirm("Are you sure you want to delete ?")){
      this.jobPostService.deleteJob(_id).subscribe( res =>{
        console.log(res);
        this.router.navigate(["/admin/add-job"]);
      })
    }
  }

  ngOnDestroy() {
    // localStorage.removeItem('searchBar');
  }
}
