import { Component, OnInit } from "@angular/core";
import { UserService } from "../service/user.service";
import { FormGroup, Validators, FormControl } from "@angular/forms";
import { Router } from "@angular/router";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"]
})
export class RegisterComponent implements OnInit {

  // registerForm = new FormGroup({
  //   name: new FormControl("", [Validators.required]),
  //   email: new FormControl("", [Validators.required]),
  //   password: new FormControl("", [Validators.required])
  // });

  // personal form
  personalForm = new FormGroup({
    name: new FormControl('', [
      Validators.required
    ]),

    email: new FormControl('',[
      Validators.required,
      Validators.email
    ]),

    password: new FormControl('',[
      Validators.required,
    ]),

    mobile: new FormControl('',[
      Validators.required,
      Validators.pattern('^[0-9]*$'),
      Validators.minLength(10),
      Validators.maxLength(10)
    ]),

    address1: new FormControl('',[
      Validators.required,
      Validators.maxLength(150)
    ]),

    address2: new FormControl('',[
      Validators.maxLength(150)
    ]),

    city: new FormControl('',[
      Validators.required,
    ]),

    state: new FormControl('',[
      Validators.required
    ]),

    postalCode: new FormControl('',[
      Validators.required,
      Validators.pattern('^[0-9]*$')
    ]),

    country: new FormControl('',[
      Validators.required,
      Validators.pattern('^[a-zA-Z]*$')
    ]),

    expYear: new FormControl('',[
      Validators.required,
      Validators.pattern('^[0-9]*$'),
      Validators.maxLength(2)
    ]),

    expMonth: new FormControl('',[
      Validators.required,
      Validators.pattern('^[0-9]*$'),
      Validators.max(12),
      Validators.maxLength(2)
    ]),

    skills: new FormControl('',[
      Validators.required,
      Validators.maxLength(200)
    ]),

    currEmp: new FormControl('', [
      Validators.pattern('^[^s]+[-a-zA-Zs]+([-a-zA-Z]+[ ]+[.])*$')
    ]),

    currLocation: new FormControl('',[
    ]),

    currJobDesc: new FormControl('',[
      Validators.maxLength(200),
    ]),

    currExp: new FormControl('',[
      Validators.pattern('^[0-9]*$'),
      Validators.maxLength(2)
    ]),

    prevEmp: new FormControl('',[
    ]),

    prevJobDesc: new FormControl('',[
      Validators.maxLength(200)
    ]),
    prevExp: new FormControl('',[
      Validators.maxLength(2),
      Validators.pattern('^[0-9]*$')
    ]),

    college: new FormControl('', [
      Validators.required
    ]),

    collegeYear: new FormControl('',[
      Validators.required,
    ]),

    graduate: new FormControl('',[
      Validators.required,
    ]),

    gradSchool: new FormControl('',[
      Validators.required,
    ]),

    schoolYear: new FormControl('',[
      Validators.required,
      Validators.maxLength(2),
      Validators.pattern('^[0-9]*$')
    ]),

    qualification: new FormControl('',[
      Validators.maxLength(300),
      Validators.required
    ]),
    certificate: new FormControl('',[
      Validators.required,
      Validators.maxLength(300),
    ]),
  });

  // employeement form
  // employementForm = new FormGroup({
  //   currEmp: new FormControl('', [
  //     Validators.required,
  //     Validators.pattern('^[^s]+[-a-zA-Zs]+([-a-zA-Z]+[ ]+[.])*$')
  //   ]),

  //   currLocation: new FormControl('',[
  //     Validators.required,
  //   ]),

  //   currJobDesc: new FormControl('',[
  //     Validators.required,
  //     Validators.maxLength(200),
  //   ]),

  //   currExp: new FormControl('',[
  //     Validators.required,
  //     Validators.pattern('^[0-9]*$'),
  //     Validators.maxLength(2)
  //   ]),

  //   prevEmp: new FormControl('',[
  //     Validators.required,
  //   ]),

  //   prevJobDesc: new FormControl('',[
  //     Validators.maxLength(200),
  //     Validators.required
  //   ]),
  //   prevExp: new FormControl('',[
  //     Validators.required,
  //     Validators.maxLength(2),
  //     Validators.pattern('^[0-9]*$')
  //   ])
  // });

  // education form
  // educationForm = new FormGroup({
  //   college: new FormControl('', [
  //     Validators.required,
  //   ]),

  //   collegeYear: new FormControl('',[
  //     Validators.required,
  //   ]),

  //   graduate: new FormControl('',[
  //     Validators.required,
  //   ]),

  //   gradSchool: new FormControl('',[
  //     Validators.required,
  //   ]),

  //   schoolYear: new FormControl('',[
  //     Validators.required,
  //     Validators.maxLength(2),
  //     Validators.pattern('^[0-9]*$')
  //   ]),

  //   qualification: new FormControl('',[
  //     Validators.maxLength(300),
  //     Validators.required
  //   ]),
  //   certificate: new FormControl('',[
  //     Validators.required,
  //     Validators.maxLength(300),
  //   ]),
  // });

  visible: boolean

  constructor(private userService: UserService, private router: Router) {
    this.visible = false;
  }

  ngOnInit() {
    this.visible = !!localStorage.getItem('status');
  }

  next(initial: string){
    if(initial == 'personal' && this.visible){
      (<HTMLDivElement>document.getElementById("tabContent1")).style.display = "none";
      (<HTMLDivElement>document.getElementById("tabContent2")).style.display = "block";
    }
    else {
    (<HTMLDivElement>document.getElementById("tabContent3")).style.display = "block";
    (<HTMLDivElement>document.getElementById("tabContent2")).style.display = "none";
    (<HTMLDivElement>document.getElementById("tabContent1")).style.display = "none";
  }
  }

  userRegister() {
    console.log(this.personalForm.value)
    if (this.personalForm.valid) {
      this.userService.register(this.personalForm.value).subscribe(res => {
        this.personalForm.reset();
        this.router.navigate(["dashboard/login"]);
      });
    }
  }

  // userEmployeement(){
  //   if (this.employementForm.valid) {
  //     this.userService.updateInfo(this.personalForm.value.email,this.employementForm.value).subscribe(res => {
  //       // this.registerForm.reset();
  //     });
  //   }
  // }

  // userEducation(){
  //   if (this.educationForm.valid) {
  //     this.userService.educationInfo(this.personalForm.value.email, this.educationForm.value).subscribe(res => {
  //       // this.registerForm.reset();
  //     });
  //   }
  // }

  tab(elementId: string) {
    (<HTMLDivElement>document.getElementById("tabContent1")).style.display = "none";
    (<HTMLDivElement>document.getElementById("tabContent2")).style.display = "none";
    (<HTMLDivElement>document.getElementById("tabContent3")).style.display = "none";
    (<HTMLDivElement>document.getElementById(elementId)).style.display = "block";
  }

// onSubmit(){
//   this.userService.register(this.personalForm.value).subscribe(res =>{
//     console.log(res);
//   });
//   console.log(this.personalForm.value);
//   alert("Form Submitted Successfully");
// }

  // personal form
  get name() {
    return this.personalForm.get('name')
  }

  get email(){
    return this.personalForm.get('email')
  }

  get password(){
    return this.personalForm.get('password')
  }

  get mobile(){
    return this.personalForm.get('mobile')
  }

  get address1(){
    return this.personalForm.get('address1')
  }

  get address2(){
    return this.personalForm.get('address2')
  }

  get city(){
    return this.personalForm.get('city')
  }

  get state(){
    return this.personalForm.get('state')
  }

  get postalCode(){
    return this.personalForm.get('postalCode')
  }

  get country(){
    return this.personalForm.get('country')
  }

  get expYear(){
    return this.personalForm.get('expYear')
  }

  get expMonth(){
    return this.personalForm.get('expMonth')
  }

  get skills(){
    return this.personalForm.get('skills')
  }

  get currEmp() {
    return this.personalForm.get('currEmp')
  }

  get currLocation(){
    return this.personalForm.get('currLocation')
  }

  get currJobDesc(){
    return this.personalForm.get('currJobDesc')
  }

  get currExp(){
    return this.personalForm.get('currExp')
  }

  get prevEmp(){
    return this.personalForm.get('prevEmp')
  }

  get prevJobDesc(){
    return this.personalForm.get('prevJobDesc')
  }

  get prevExp(){
    return this.personalForm.get('prevExp')
  }

  // educational form
  get college() {
    return this.personalForm.get('college')
  }

  get collegeYear(){
    return this.personalForm.get('collegeYear')
  }

  get graduate(){
    return this.personalForm.get('graduate')
  }

  get gradSchool(){
    return this.personalForm.get('gradSchool')
  }

  get schoolYear(){
    return this.personalForm.get('schoolYear')
  }

  get qualification(){
    return this.personalForm.get('qualification')
  }

  get certificate(){
    return this.personalForm.get('certificate')
  }

  // employeement form
  // get currEmp() {
  //   return this.employementForm.get('currEmp')
  // }

  // get currLocation(){
  //   return this.employementForm.get('currLocation')
  // }

  // get currJobDesc(){
  //   return this.employementForm.get('currJobDesc')
  // }

  // get currExp(){
  //   return this.employementForm.get('currExp')
  // }

  // get prevEmp(){
  //   return this.employementForm.get('prevEmp')
  // }

  // get prevJobDesc(){
  //   return this.employementForm.get('prevJobDesc')
  // }

  // get prevExp(){
  //   return this.employementForm.get('prevExp')
  // }

  // // educational form
  // get college() {
  //   return this.educationForm.get('college')
  // }

  // get collegeYear(){
  //   return this.educationForm.get('collegeYear')
  // }

  // get graduate(){
  //   return this.educationForm.get('graduate')
  // }

  // get gradSchool(){
  //   return this.educationForm.get('gradSchool')
  // }

  // get schoolYear(){
  //   return this.educationForm.get('schoolYear')
  // }

  // get qualification(){
  //   return this.educationForm.get('qualification')
  // }

  // get certificate(){
  //   return this.educationForm.get('certificate')
  // }
}


