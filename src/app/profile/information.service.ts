import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InformationService {

  apiUrl: string = 'http://localhost:8000/api/v1/information';




  constructor(private httpClient: HttpClient) {

   }



  getInformation(): Observable<getInformation> {
    const token = localStorage.getItem('token');
    const headers = { 'Authorization': `Bearer ${token}` };
    return this.httpClient.get<getInformation>(`${this.apiUrl}/get`, { headers });
  }
  postInformation(information: Information): Observable<any> {
    console.log("test");
    const token = localStorage.getItem('token');
    const headers = { 'Authorization': `Bearer ${token}` };
    return this.httpClient.post(`${this.apiUrl}/store`, information, { headers })
      .pipe(
        catchError(error => {
          console.error('There was an error!', error);
          return throwError(error);
        })
      );
  }
}

export interface Information{
  street: string;
  city: string;
  postal_code: string;
  phone_number: string;
  firstName: string;
  lastName: string;
}

export interface getInformation {
  information: Information;
}
