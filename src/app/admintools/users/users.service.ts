import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {


  apiUrl = 'http://localhost:8000/api/v1/users'
  constructor(private httpClient: HttpClient) { }



  getUsers(): Observable<UsersInformationResponse> {
    const token = localStorage.getItem('token');
    const headers = { 'Authorization': `Bearer ${token}` };
    return this.httpClient.get<UsersInformationResponse>(`${this.apiUrl}`, { headers });
  }
  grantAdmin(userId: number): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    const body = {
      userId: userId
    };

    return this.httpClient.post(`http://localhost:8000/api/grantAdmin`, body, { headers: headers });
  }

  removeUser(userId: number): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    const body = {
      userId: userId
    };
    return this.httpClient.post(`http://localhost:8000/api/removeUser`, body, { headers: headers });
  }

  removeAdmin(userId: number): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    const body = {
      userId: userId
    };

    return this.httpClient.post('http://localhost:8000/api/removeAdmin', body, { headers: headers });
  }


}

export interface UsersInformationResponse{
  data:UserInformation[];
}

export interface UserInformation{

  id:number;
  name:string;
  email:string;
  created_at:string;
  updated_at:string;
}
