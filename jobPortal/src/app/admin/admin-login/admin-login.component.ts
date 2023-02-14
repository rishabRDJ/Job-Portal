import { logging } from 'protractor';
import { JobPostingService } from './../service/job-posting.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss']
})
export class AdminLoginComponent implements OnInit {

  adminLoginForm = new FormGroup({
    email: new FormControl("", [Validators.required]),
    password: new FormControl("", [Validators.required])
  });
  isVisible = false;

  constructor(
    private router: Router,
    private jobPostService: JobPostingService
  ) { }

  ngOnInit(): void {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("searchItem");
    localStorage.removeItem("searchToken");
  }

  adminLogin() {
    if (this.adminLoginForm.value.email == "admin" && this.adminLoginForm.value.password == "123") {
      this.router.navigate(["admin/add-job"]);
      localStorage.setItem("token", "adminToken");
    }
    else{
      this.isVisible = true;
    }
    this.adminLoginForm.reset();
  }


  // adminLogin(){
  //   this.jobPostService.login(this.adminLoginForm.value.email, this.adminLoginForm.value.password )
  // }
}
