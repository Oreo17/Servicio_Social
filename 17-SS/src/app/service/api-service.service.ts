import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ApiServiceService {
  constructor(private http: HttpClient) {
    console.log('Service initialized');
  }

  uri(query: string) {
    const url = `http://localhost:3006/api/${query}`;
    return url;
  }

  search(query: string){
    return this.http.get(this.uri(`users/query/${query}`));
  }

  getUsers(){
    return this.http.get(this.uri(`users`));
  }

  getUsersTutor(id: string){
    return this.http.get(this.uri(`users/tutorados/${id}`));
  }

  getUsersTutorQuery(id: any,query: string){
    return this.http.get(this.uri(`users/tutorados/query/${id}/${query}`));
  }

  getUserInfo(id: string) {
    return this.http.get(this.uri(`users/info/${id}`));
  }

  getCurrentClasses(id: string) {
    return this.http.get(this.uri(`classes/current/${id}`));
  }

  getNextClasses(id: string) {
    return this.http.get(this.uri(`classes/next/${id}`));
  }

  getClassesNewStudent(id: string) {
    return this.http.get(this.uri(`classes/available/${id}`));
  }

  getAllClassesMap(id: string) {
    return this.http.get(this.uri(`classes/${id}`));
  }

  getFailedClasses(id: string){
    return this.http.get(this.uri(`classes/failed/${id}`));
  }

  addGrade(data: any){
    return this.http.post(this.uri(`grades/`), data);
  }

  addCourse(data: any){
    return this.http.post(this.uri(`courses/add/`), data);
  }

  createAccount(data: any){
    return this.http.post(this.uri(`users/register`), data);
  }

  createUser(data: any){
    return this.http.post(this.uri(`users/registerUser`), data);
  }

  login(values: any) {
    return this.http.post(this.uri(`auth/login`), values);
  }
}
