// auth.actions.ts
import { createAction, props } from '@ngrx/store';

export const login = createAction(
  '[Login Page] Login',
  props<{ email: string; password: string; remember:boolean }>()
);
export const loginSuccess = createAction(
  '[Auth] Login Success',
  props<{ token: any}>()
);
export const loginFailure = createAction(
  '[Auth] Login Failure',
  props<{ error: any }>()
);
export const logout = createAction('[Auth] Logout');
