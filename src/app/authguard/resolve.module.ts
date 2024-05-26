import { Injectable } from '@angular/core';
import { Resolve, Router } from '@angular/router';
import { Observable, catchError, of } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { InformationService } from '../profile/information.service';
import { Store } from '@ngrx/store';
import { logout } from '../auth/auth.actions';

@Injectable({
  providedIn: 'root'
})
export class ApiDataResolver implements Resolve<any> {

  constructor(private router: Router,private s: Store, private service: InformationService) {

  }

  resolve(): Observable<any> {
    return this.service.getInformation().pipe(
      catchError((error) => {
        if(error.status == 401){
          this.s.dispatch(logout());

          this.router.navigate(['/login']);
        }
        return of(null);
      })
    );
  }
}
