import { JobPost } from './../model/job-post';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JobPostingService {

  private ROOT_URL = "http://localhost:3200/api/job";
  constructor(private http: HttpClient, private router: Router) { }

  private httpOptions = {
    headers: new HttpHeaders()
      .set("Content-Type","application/json")
      .set("auth-token", "adminToken")
  };


  getJobs() {
    return this.http.get<JobPost[]>(this.ROOT_URL);
  }

  getDetails(id: string){
    return this.http.get<JobPost>(`${this.ROOT_URL}/${id}`);
  }

  latestJobs(): Observable<JobPost[]> {
    return this.http.get<JobPost[]>(`${this.ROOT_URL}/latest`);
  }

  searchBy(field: string, key: string): Observable<JobPost[]>{
    return this.http.get<JobPost[]>(`${this.ROOT_URL}/${field}/${key}`);
  }

  searchBoth(skill: string, location: string): Observable<JobPost[]>{
    return this.http.get<JobPost[]>(`${this.ROOT_URL}/both/${skill}/${location}`);
  }

  addJob(job: any){
    return this.http.post<any>(this.ROOT_URL, job);
  }

  editJob(job: any, id: string){
    return this.http.put<any>(`${this.ROOT_URL}/${id}`, job);
  }

  deleteJob(id: string){
    return this.http.delete(`${this.ROOT_URL}/${id}`);
  }

  logout(): void {
    localStorage.removeItem("token");
    this.router.navigate(["/admin"]);
  }

  loggedIn(): boolean{
    const token = localStorage.getItem("token");
    if(token == "adminToken") return true;
    else return false;
  }

}
