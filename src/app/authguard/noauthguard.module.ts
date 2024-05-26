import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { CanActivate, Router } from '@angular/router';
import { AppState } from '../auth/app.state';
import { Observable, map, take } from 'rxjs';
import { selectLoggedIn } from '../auth/auth.selector';

@Injectable({
  providedIn: 'root'
})
export class NoAuthGuard implements CanActivate {

  constructor(private store: Store<AppState>, private router: Router) { }

  canActivate(): Observable<boolean> {
    return this.store.pipe(
      select(selectLoggedIn),
      map(isLoggedIn => {
        if (isLoggedIn) {
          this.router.navigate(['/']); // Przekieruj na stronę główną, jeśli użytkownik jest zalogowany
          return false;
        }
        return true;
      }),
      take(1) // We take only the first value emitted and then complete
    );
  }
}
