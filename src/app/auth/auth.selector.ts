// auth.selectors.ts
import { createSelector } from '@ngrx/store';
import { AppState } from './app.state';
import { AuthState } from './auth.reducer';


export const selectAuth = (state: AppState) => state.auth;

export const selectLoggedIn = createSelector(
  selectAuth,
  (auth: AuthState) => auth.loggedIn
);
