import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Observable, catchError, throwError } from 'rxjs';
import { AppState } from './app.state';
import { loginSuccess, logout } from './auth.actions';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class AuthService{

  private url = "http://localhost:8000/api/";

  private user = new BehaviorSubject<User>(new User());

  private adminAccess = new BehaviorSubject<boolean>(false);

  constructor(private store: Store<AppState>, private http: HttpClient,private s: Store){
  }


  register(name: string, email: string, password: string): Observable<any> {
    const body = { name,email,password };
    return this.http.post<any>(this.url + "register", body);
  }
  getUser() {
    return this.user.asObservable();
  }
  getAdminAccess() {
    return this.adminAccess.asObservable();
  }

  checkAdminAccess() {
    let token = localStorage.getItem('token');
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    };
    this.http.get<any>(this.url + "admin", httpOptions)
    .pipe(
      catchError(error => {
        console.error('Error occurred:', error);
        this.adminAccess.next(false);
        return throwError(error);
      })
    )
    .subscribe(response => {
      if(response.message == "Admin access"){
        this.adminAccess.next(true);
      }
    });

    this.adminAccess.subscribe(response => {
      console.log(response);
    });

  }
  getUserDatails(): Observable<any>{
    let token = localStorage.getItem('token');
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    };

    return this.http.get(this.url + "me",httpOptions);

  }

  changePassword(email:string, password:string, newpassword:string): Observable<any>{
    let token = localStorage.getItem('token');
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    };
    let body = {
      email: email,
      password: password,
      newPassword: newpassword
    };

    return this.http.post(this.url + "changePassword",body,httpOptions);
  }
  updateUserDetails(){
    console.log("test1");
    if(localStorage.getItem('token') != null){
      this.getUserDatails().subscribe(data => {
        this.user.next(data);

        // Log this.user inside the subscribe() to ensure it's updated
      });
    }
  }
  updateUser(user: User){
    this.user.next(user);
  }

  checkLoginStatus() {
    if(localStorage.getItem('token') != null){
      let token = localStorage.getItem('token');
      let httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        })
      };
      this.http.get(this.url + "validate",httpOptions)
        .pipe(
          catchError(error => {
            console.error('Error occurred:', error);
            localStorage.removeItem('token');
            this.s.dispatch(logout());
            return throwError(error);
          })
        )
        .subscribe((data: any) => {
          if(data.message === 'Token is valid'){
            this.s.dispatch(loginSuccess({token: {access_token: token}}));
          }else{
            localStorage.removeItem('token');
          }
        });
    }
  }

}
