import { Router } from '@angular/router';
import { JobPostingService } from './../admin/service/job-posting.service';
import { UserService } from './../user/service/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  skillInput: string;
  locationInput: string;
  visible: boolean;
  userName!: string;

  constructor(public userService: UserService, public adminService: JobPostingService, private router: Router) {
    this.skillInput = "";
    this.locationInput = "";
    this.visible = !!localStorage.getItem('searchBar');
  }

  ngOnInit(): void {
    // this.userName = JSON.parse(localStorage.getItem('userName') || '');
  }

  alljobs(key: string){
    if(key == "user"){
      this.router.navigate(["dashboard/all-jobs"]);
      localStorage.removeItem("searchToken");
      localStorage.removeItem("searchItem");
    }
    else this.router.navigate(["admin/job-list"]);
    localStorage.removeItem("searchToken");
    localStorage.removeItem("searchItem");
  }

  logout(){
    if(this.adminService.loggedIn()) this.adminService.logout();
    else this.userService.logout();
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
    window.location.reload();
  }

  clear(){
    localStorage.removeItem("searchToken");
    localStorage.removeItem("searchItem");
    window.location.reload();
  }

}
