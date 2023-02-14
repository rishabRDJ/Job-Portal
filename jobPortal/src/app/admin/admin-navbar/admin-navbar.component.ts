import { JobPostingService } from './../service/job-posting.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-navbar',
  templateUrl: './admin-navbar.component.html',
  styleUrls: ['./admin-navbar.component.scss']
})
export class AdminNavbarComponent implements OnInit {

  constructor(public adminService: JobPostingService) { }

  ngOnInit(): void {
  }

  logout(){
    localStorage.removeItem("token");
  }
}
