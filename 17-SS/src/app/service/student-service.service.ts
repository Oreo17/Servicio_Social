import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StudentServiceService {

  constructor(private http: HttpClient) {
    console.log('Service initialized');
  }

  uri(query: string) {
    const url = `http://localhost:3009/api/students/${query}`;
    return url;
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

  getFailedClasses(id: string){
    return this.http.get(this.uri(`classes/failed/${id}`));
  }

  getAllClassesMap(id: string) {
    return this.http.get(this.uri(`classes/${id}`));
  }


}
