import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable, filter } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';
import { selectLoggedIn } from '../auth/auth.selector';
import { initFlowbite } from 'flowbite';
import { AppState } from '../auth/app.state';
import { logout } from '../auth/auth.actions';
import { ToastrService } from 'ngx-toastr';
import { ToastrErrorComponent } from '../toastr/toastrerror.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {

  isLoggedIn$: Observable<boolean>;
  darkMode = false;
  path!: string;
  email!: string;

  avatar!: string;
  constructor(private store: Store<AppState>, private http: HttpClient,private s: Store, private router:Router,private auth: AuthService, private cdr: ChangeDetectorRef, private toastr: ToastrService){


    this.isLoggedIn$ = this.store.pipe(select(selectLoggedIn));

    console.log("Initialize header");

  }

  ngOnInit(): void {

    initFlowbite();

    this.auth.updateUserDetails();
    this.auth.getUser().subscribe(user  => {
      this.cdr.detectChanges();
      if (user && typeof user.name !== 'undefined') {
        this.avatar = user.name.charAt(0).toUpperCase() + user.name.charAt(1).toUpperCase();

        this.email = user.email;
      }

      this.cdr.detectChanges();
    });
  }
  logout(){
    this.s.dispatch(logout());
    this.toastr.success('', "Wylogowano!", {toastComponent: ToastrErrorComponent});



  }

  routerMainPage(){

  }




}
