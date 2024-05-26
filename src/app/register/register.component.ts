import { AuthService } from './../auth/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { catchError, of, throwError } from 'rxjs';
import { ToastrErrorComponent } from '../toastr/toastrerror.component';
import { ToastrSuccessComponent } from '../toastr/toastrsucess.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  form!: FormGroup;
  terms: boolean = false;


  constructor(private toast: ToastrService, private authService: AuthService,private store: Store, private router: Router,private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      repeatPassword: ['', [Validators.required, Validators.minLength(6)]],
    });

  }
//firstName: string, lastName: string, email: string, password: string, phone: string
  onSubmit(event: Event){
    if(this.form.controls['email'].invalid || this.form.controls['name'].invalid || this.form.controls['password'].invalid || this.form.controls['repeatPassword'].invalid){
      this.toast.error("Podaj poprawne dane!","Podaj poprawne dane!", {toastComponent: ToastrErrorComponent});
      return;
    }
    if(this.form.value.password == this.form.value.repeatPassword){
    if(this.terms){
    this.authService.register(this.form.value.name,this.form.value.email,this.form.value.password)
    .pipe(
      catchError((error: HttpErrorResponse) => {
        // Handle the error here
        // Show an error toast
        this.toast.error("", error.error.message, {toastComponent: ToastrErrorComponent});
        // You can either return a new observable, in this case null, or throw an Error.
        return throwError(error);
      })
    )
    .subscribe(
      (response: any) => {
        // Handle the response here
        this.toast.success("Poprawnie dokonano rejestracji!","Poprawnie dokonano rejestracji!", {toastComponent:ToastrSuccessComponent});
        this.router.navigate(['/']);
        // Navigate to another route, etc.
      }
    );
  }else{
    this.toast.error("","Zaakceptuj regulamin!", {toastComponent: ToastrErrorComponent});
  }
}else{
  this.toast.error("","Hasła nie są takie same!", {toastComponent: ToastrErrorComponent});

}
  }


}
