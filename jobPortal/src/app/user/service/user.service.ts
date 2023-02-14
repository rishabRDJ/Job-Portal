import { JobPost } from './../../admin/model/job-post';
import { UserDetail } from './../model/user-detail';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private ROOT_URL = "http://localhost:3200/api/user";

  // HTTP Options
  private httpOptions = {
    headers: new HttpHeaders()
      .set("Content-Type","application/json")
      .set("auth-token", localStorage.getItem("token") || '{}')
  };

  constructor(private http: HttpClient, private router: Router) { }

  register(user: any) {
    return this.http.post<any>(`${this.ROOT_URL}/register`, user);
  }

  educationInfo(email: string, education: any){
    return this.http.post<any>(`${this.ROOT_URL}/education/${email}`, education);
  }

  updateInfo(email: string, newInfo: any){
    console.log(newInfo);
    return this.http.put<any>(`${this.ROOT_URL}/${email}`, newInfo);
  }

  login(user: any){
    return this.http.post<any>(`${this.ROOT_URL}/login`, user);
  }

  getDetails(id: string){
    return this.http.get<UserDetail>(`${this.ROOT_URL}/${id}`);
  }

  saveJob(job: string){
    const user = localStorage.getItem("user");
    return this.http.post<any>(`${this.ROOT_URL}/savedJob/${user}/${job}`, this.httpOptions);
  }

  getSaveJob(): Observable<JobPost[]>{
    const user = localStorage.getItem("user");
    return this.http.get<JobPost[]>(`${this.ROOT_URL}/saveJobList/${user}`);
  }

  deletesaveJob(job: string){
    const user = localStorage.getItem("user");
    return this.http.delete<any>(`${this.ROOT_URL}/savedJob/${user}/${job}`, this.httpOptions);
  }

  applyJob(job: string){
    const user = localStorage.getItem("user");
    return this.http.post<any>(`${this.ROOT_URL}/appliedJob/${user}/${job}`, this.httpOptions);
  }

  getApplyJob(): Observable<JobPost[]> {
    const user = localStorage.getItem("user");
    return this.http.get<JobPost[]>(`${this.ROOT_URL}/applyJobList/${user}`);
  }

  deleteapplyJob(job: string){
    const user = localStorage.getItem("user");
    return this.http.delete<any>(`${this.ROOT_URL}/appliedJob/${user}/${job}`, this.httpOptions);
  }

  logout(){
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("savedJobs");
    localStorage.removeItem("appliedJobs");
    localStorage.removeItem("userName");
    this.router.navigate(["/dashboard"]);
  }

  profile(): boolean{
    return !!localStorage.getItem("profile");
  }

  loggedIn(): boolean{
    return !!localStorage.getItem("token");
  }

  getUserName() {
    return JSON.parse(localStorage.getItem('userName') || '');
  }
}
