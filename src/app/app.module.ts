import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { MainComponent } from './main/main.component';
import { AnimalsComponent } from './animals/animals.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrSuccessComponent } from './toastr/toastrsucess.component';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './auth/auth.effects';
import { authReducer, initialState } from './auth/auth.reducer';
import { AnimalComponent } from './animal/animal.component';
import { ProfileComponent } from './profile/profile.component';
import { AdmintoolsComponent } from './admintools/admintools.component';
import { UsersComponent } from './admintools/users/users.component';
import { PetsComponent } from './admintools/pets/pets.component';
import { FavouritesComponent } from './profile/favourites/favourites.component';
import { MeetingsComponent } from './profile/meetings/meetings.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MainComponent,
    AnimalsComponent,
    LoginComponent,
    RegisterComponent,
    AnimalComponent,
    ProfileComponent,
    AdmintoolsComponent,
    UsersComponent,
    PetsComponent,
    FavouritesComponent,
    MeetingsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    StoreModule.forRoot({ auth: authReducer }, { initialState: { auth: initialState } }),
    FormsModule,
    EffectsModule.forRoot([AuthEffects]),
    ToastrModule.forRoot({
      timeOut:5000,
      positionClass: 'toast-top-right',
      toastComponent: ToastrSuccessComponent,
      preventDuplicates: true,
    }),
    ReactiveFormsModule,

  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
