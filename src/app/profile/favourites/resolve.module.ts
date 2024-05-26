import { Injectable } from '@angular/core';
import { Resolve, Router } from '@angular/router';
import { Observable, catchError, of } from 'rxjs';
import { Store } from '@ngrx/store';
import { AnimalsService } from '../../animals.service';

@Injectable({
  providedIn: 'root'
})
export class FavouriteResolveData implements Resolve<any> {

  constructor(private router: Router,private s: Store, private service: AnimalsService) {

  }

  resolve(): any {
    return this.service.getFavorites();
  }
}
