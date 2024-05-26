// auth.reducer.ts
import { createReducer, on } from '@ngrx/store';
import { login, loginFailure, loginSuccess, logout } from './auth.actions';
import { Injectable } from '@angular/core';
import { User } from './user';
import { LoginReponse } from './response';

export interface AuthState {
  loggedIn: boolean;
  token:any;
}

export const initialState: AuthState = { loggedIn: false, token:null };

export const authReducer = createReducer(
  initialState,
  on(loginSuccess, (state, action) => {
    const newState = { ...state, loggedIn: true, token:  action.token.access_token};

    localStorage.setItem('token', action.token.access_token);
    return newState;
  }),
  on(logout, state => {
    if(state.loggedIn != false){
    const newState = { ...state, loggedIn: false, token:null };
    localStorage.removeItem('token');


    return newState;
    }else{
      const newState = { ...state, loggedIn: false, token:null };
      return newState;
    }
  }),
  on(loginFailure, (state, action) => {

    // Return the new state
    return { ...state, error: action.error };
  })
);
