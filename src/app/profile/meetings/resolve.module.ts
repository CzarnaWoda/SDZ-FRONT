import { Injectable } from '@angular/core';
import { Resolve, Router } from '@angular/router';
import { Observable, catchError, of } from 'rxjs';
import { Store } from '@ngrx/store';
import { AnimalsService } from '../../animals.service';
import { MeetingsService } from './meetings.service';

@Injectable({
  providedIn: 'root'
})
export class InvoiceResolveDataApi implements Resolve<any> {

  constructor(private router: Router,private s: Store, private service: MeetingsService) {

  }

  resolve(): Observable<any> {
    return this.service.getInvoicesByUserId();
  }
}
