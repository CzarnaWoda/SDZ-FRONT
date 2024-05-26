import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PetsService {


  apiUrl = 'http://localhost:8000/api/pets';

  constructor(private httpClient: HttpClient) {


  }


  getPets(): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = { 'Authorization': `Bearer ${token}` };
    return this.httpClient.get<any>(`${this.apiUrl}`, { headers });
  }

  addPet(petData: FormData): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = { 'Authorization': `Bearer ${token}` };
    return this.httpClient.post('http://localhost:8000/api/pet/store', petData, { headers});
  }
}
