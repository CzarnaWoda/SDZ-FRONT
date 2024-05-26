import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { UsersService } from './users.service';

@Injectable({
  providedIn: 'root'
})
export class UserDataResolve implements Resolve<any> {

  constructor(private service: UsersService) {

  }

  resolve(): Observable<any> {

    return this.service.getUsers();

  }
}
