import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private loginUrl = 'http://localhost:8000/api/login';  // Replace with your API endpoint

  constructor() { }
}
