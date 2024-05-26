import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { PetsService } from './pets.service';

@Injectable({
  providedIn: 'root'
})
export class PetDataResolve implements Resolve<any> {

  constructor(private service: PetsService) {

  }

  resolve(): Observable<any> {

    return this.service.getPets();

  }
}
