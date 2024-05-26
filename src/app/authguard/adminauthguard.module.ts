import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AppState } from '../auth/app.state';
import { AuthService } from '../auth/auth.service';
import { selectLoggedIn } from '../auth/auth.selector';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate {

  constructor(private store: Store<AppState>, private router: Router, private auth: AuthService) { }

  canActivate(): Observable<boolean> {
    let bool = false;
    return this.store.pipe(
      select(selectLoggedIn),
      map(isLoggedIn => {
        if (isLoggedIn) {
          this.auth.getAdminAccess().subscribe((access) => {

            if(access){
              bool = true;
            }else{
              this.router.navigate(['/']);
              bool = false;
            }
          });
        }
        return bool;
      }),
      take(1)
    );
  }
}
