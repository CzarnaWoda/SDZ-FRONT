import { Injectable, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, map, take } from 'rxjs';
import { selectLoggedIn } from '../auth/auth.selector';
import { Store, select } from '@ngrx/store';
import { AppState } from '../auth/app.state';



@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private store: Store<AppState>, private router: Router) { }


  canActivate(): Observable<boolean> {
    return this.store.pipe(
      select(selectLoggedIn),
      map(isLoggedIn => {
        if (isLoggedIn) {
          return true;
        }
        this.router.navigate(['/']);
        return false;
      }),
      take(1)
    );
  }
}
