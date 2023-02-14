import { Component, OnInit } from "@angular/core";
import { UserService } from "../service/user.service";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Router } from "@angular/router";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    email: new FormControl("", [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$')]),
    password: new FormControl("", [Validators.required, Validators.minLength(6)])
  });

  get emailId() {
    return this.loginForm.get('emailId');
  }
  get password() {
    return this.loginForm.get('password');
  }

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit() {}

  userLogin() {
    if (this.loginForm.valid) {
      this.userService.login(this.loginForm.value).subscribe(
        res => {
          localStorage.setItem("user", res.id);
          localStorage.setItem("token", res.token);
          this.userService.getDetails(res.id).subscribe( res => {
            localStorage.setItem("savedJobs", JSON.stringify(res.savedJobs) || '[]');
            localStorage.setItem("appliedJobs", JSON.stringify(res.appliedJobs) || '[]');
            console.log(res.name);
            localStorage.setItem("userName", JSON.stringify(res.name) || '');
          })
          this.loginForm.reset();
          this.router.navigate(["dashboard/jobs"]);
        },
        err => {
          console.log(err);
        }
      );
    }
  }

  navigate(status: boolean){
    if(status) localStorage.setItem("status","true");
    else localStorage.removeItem("status");
    this.router.navigate(['/dashboard/registration']);
  }
}
