import { MeetingsService } from './meetings.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { data } from 'autoprefixer';
import { ToastrService } from 'ngx-toastr';
import { root } from 'postcss';
import { ToastrSuccessComponent } from '../../toastr/toastrsucess.component';
import { ToastrErrorComponent } from '../../toastr/toastrerror.component';

@Component({
  selector: 'app-meetings',
  templateUrl: './meetings.component.html',
  styleUrl: './meetings.component.css'
})
export class MeetingsComponent implements OnInit{


  invoices!: Invoice[];

  constructor(private route: ActivatedRoute,private service: MeetingsService,private router: Router, private toastr: ToastrService){

  }

  ngOnInit(): void {
      this.route.data.subscribe(data => {
        console.log(data);

        this.invoices = data[0].invoices;
      })

      console.log(this.invoices);
      if(this.invoices.length == 0){
        this.toastr.error('Nie masz zadnych spotkan!' , 'Nie masz zadnych spotkan!', {
          toastComponent: ToastrErrorComponent
        });
        this.router.navigate(['profile']);
      }
  }

  showPet(id: number){
    localStorage.setItem('animalId', id.toString());
    this.router.navigate(['/animal']);
  }

  deleteInvoice(id: number){
    this.service.deleteInvoice(id).subscribe(invoice => {
      this.toastr.success("Usunieto spotkanie", "Usunieto spotkanie", {
        toastComponent:ToastrSuccessComponent
      });
      this.router.navigate(['profile']);
    }, error => {
      this.toastr.error("Nie udało się usunąć spotkania", "Nie udało się usunąć spotkania", {
        toastComponent:ToastrErrorComponent
      })
    });
  }





}

export interface Invoice{
  created_at: string;
  date:string;
  id: number;
  pet_id: number;
  updated_at: number;
  user_id: number;
}
