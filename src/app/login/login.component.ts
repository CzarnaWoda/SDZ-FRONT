import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ToastrErrorComponent } from '../toastr/toastrerror.component';
import { login } from '../auth/auth.actions';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  form!: FormGroup;
  remember: boolean = false;


  constructor(private formBuilder: FormBuilder,private store: Store, private router: Router, private toastr: ToastrService) {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
   }


  registerRouter(){
    this.router.navigate(['register']);
  }
  onSubmit(event: Event) {
    if(this.form.controls['email'].invalid){
      this.toastr.error('Podaj poprawny adres email!', 'Podaj poprawny adres email!', {
        toastComponent:ToastrErrorComponent
      })
      return;
    }
    if(this.form.controls['password'].invalid){
      this.toastr.error('Podaj poprawne hasło!', 'Podaj poprawne hasło!', {
        toastComponent:ToastrErrorComponent
      })
      return;
    }
    this.store.dispatch(login({ email: this.form.value.email, password: this.form.value.password, remember: this.remember }));
    let token = localStorage.getItem('token');
    if(token != null){
      console.log(token);
      this.router.navigate(['/']);
    }else{
      event.preventDefault();
      this.store.dispatch(login({ email: this.form.value.email, password: this.form.value.password, remember: this.remember }));
    }

  }

}
