import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MeetingsService {

  constructor(private http: HttpClient) { }
  private apiUrl = 'http://localhost:8000/api/invoice';  // replace with your API URL


  getInvoicesByUserId(): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get(`${this.apiUrl}` + '/user', { headers });
  }
  deleteInvoice(invoiceId: number): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    const options = {
      headers: headers,
      body: {
        invoiceId: invoiceId
      }
    };

    return this.http.delete(`${this.apiUrl}` + "/destroy", options);
  }
}
