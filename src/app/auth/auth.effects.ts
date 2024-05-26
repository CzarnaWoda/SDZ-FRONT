import { ToastrService } from 'ngx-toastr';
// auth.effects.ts
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { login, loginFailure, loginSuccess, logout} from './auth.actions';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { tap, exhaustMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { AuthService } from './auth.service';
import { LoginReponse } from './response';
import { User } from './user';
import { ToastrSuccessComponent } from '../toastr/toastrsucess.component';
import { ToastrErrorComponent } from '../toastr/toastrerror.component';

@Injectable()
export class AuthEffects {
  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(login),
      exhaustMap(action =>
        this.http.post('http://localhost:8000/api/login', {
          email: action.email,
          password: action.password,
        }).pipe(
          tap(() => {
            this.toastr.success('', "Zalogowano!", {toastComponent: ToastrSuccessComponent});
            this.router.navigate(['/']);
            }),
          map(token => loginSuccess({ token })),
          catchError((error: HttpErrorResponse) => {
            console.error('An error occurred:', error.error);
            // Dispatch the loginFailure action with the error message
            this.toastr.error('', "Niepoprawne dane logowania!", {toastComponent: ToastrErrorComponent});
            return of(loginFailure({ error: error.error.message }));
          })
        )
      ),
    ),
  );
  updateUser$ = createEffect(() =>
  this.actions$.pipe(
    ofType(loginSuccess),
    tap(action => {
      console.log(action);
      const response = action.token;
      console.log(action.token);
      if(response && typeof response.user !== 'undefined'){
        let u = new User();
        u = response.user;
        this.authService.updateUser(u);
      }
    })
  ),
  { dispatch: false }  // Informujemy NgRx, że ten efekt nie wysyła nowej akcji
);


  constructor(private actions$: Actions, private router: Router, private http: HttpClient, private toastr: ToastrService, private authService: AuthService) {}
}
