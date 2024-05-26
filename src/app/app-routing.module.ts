import { ProfileComponent } from './profile/profile.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnimalsComponent } from './animals/animals.component';
import { MainComponent } from './main/main.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AnimalComponent } from './animal/animal.component';
import { NoAuthGuard } from './authguard/noauthguard.module';
import { AuthGuard } from './authguard/authguard.module';
import { AdmintoolsComponent } from './admintools/admintools.component';
import { AdminAuthGuard } from './authguard/adminauthguard.module';
import { ApiDataResolver } from './authguard/resolve.module';
import { UsersComponent } from './admintools/users/users.component';
import { UserDataResolve } from './admintools/users/usersresponse.module';
import { PetsComponent } from './admintools/pets/pets.component';
import { PetDataResolve } from './admintools/pets/usersresponse.module';
import { FavouritesComponent } from './profile/favourites/favourites.component';
import { MeetingsComponent } from './profile/meetings/meetings.component';
import { InvoiceResolveDataApi } from './profile/meetings/resolve.module';

const routes: Routes = [
  {path: 'animals', component:AnimalsComponent},
  {path: '', component:MainComponent},
  {path: 'login', component:LoginComponent , canActivate: [NoAuthGuard]},
  {path: 'register', component:RegisterComponent, canActivate: [NoAuthGuard]},
  {path: 'animal', component:AnimalComponent},
  {path:'profile', component: ProfileComponent, canActivate:[AuthGuard], resolve: [ApiDataResolver]},
  {path: 'admintools', component:AdmintoolsComponent, canActivate:[AdminAuthGuard]},
  {path: 'admintools/users', component:UsersComponent, canActivate:[AdminAuthGuard], resolve: [UserDataResolve]},
  {path: 'admintools/pets', component:PetsComponent, canActivate:[AdminAuthGuard], resolve: [PetDataResolve]},
  {path: 'profile/favorites', component:FavouritesComponent, canActivate:[AuthGuard]},
  {path: 'profile/meetings', component:MeetingsComponent, canActivate:[AuthGuard], resolve: [InvoiceResolveDataApi]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }