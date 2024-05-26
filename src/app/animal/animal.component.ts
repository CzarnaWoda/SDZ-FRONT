import { AnimalsService } from './../animals.service';
import { Component, OnInit } from '@angular/core';
import { Animal } from '../animals.service';
import { data } from 'autoprefixer';
import { ToastrService } from 'ngx-toastr';
import { ToastrErrorComponent } from '../toastr/toastrerror.component';
import { Modal, initFlowbite } from 'flowbite';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { ToastrSuccessComponent } from '../toastr/toastrsucess.component';

@Component({
  selector: 'app-animal',
  templateUrl: './animal.component.html',
  styleUrl: './animal.component.css'
})
export class AnimalComponent implements OnInit{


  animal!: Animal;
  baseUrl: string = 'http://localhost:8000'; // Ustaw odpowiedni adres URL
  invoiceForm: FormGroup;


  constructor(private animalService: AnimalsService,private router: Router, private fb: FormBuilder, private toastr: ToastrService){
    this.invoiceForm = this.fb.group({
      date: ['', Validators.required]
    });
  }

  ngOnInit(): void {

    this.animalService.getAnimalById(localStorage.getItem('animalId') || '').subscribe(data =>{
      this.animal = data;

      if(!this.animal.image.startsWith('https')){
        this.animal.image = this.baseUrl + this.animal.image;
        }
    })

    setTimeout(() => {
      initFlowbite();
    },200);

  }
  addToFavorites(animalId: number): void {
    // Pobierz ulubione z localStorage
    let favorites: string[] = JSON.parse(localStorage.getItem('favorites') || '[]');

    // Sprawdź, czy animalId już istnieje w ulubionych
    if (!favorites.includes(animalId.toString())) {
      // Dodaj animalId do ulubionych
      favorites.push(animalId.toString());

      // Zapisz ulubione z powrotem do localStorage
      localStorage.setItem('favorites', JSON.stringify(favorites));

      this.toastr.success('Dodano zwierze do ulubionych','Dodano zwierze do ulubionych',
        {
          toastComponent: ToastrSuccessComponent
        }
      )
    }else{
      this.toastr.error('Juz masz zapisane to zwierze do ulubionych','Juz masz zapisane to zwierze do ulubionych',
        {
          toastComponent: ToastrErrorComponent
        }
      )
    }
  }
  onSubmit() {



    const target = document.getElementById('crud-modal');

    const modal = new Modal(target);

    modal.hide();
    const date = this.invoiceForm.get('date')?.value;

    this.animalService.postInvoice(date,this.animal.id).subscribe(
      data => this.toastr.success("Umowiono spotkanie", "Umowiono spotkanie", {
        toastComponent:ToastrSuccessComponent
      }),
      error => {
        if(error.status == 401){
          this.toastr.error('Musisz sie zalogować!','Musisz sie zalogować!',
            {
              toastComponent: ToastrErrorComponent
            }
          )
        }
        if(error.status == 422){
          this.toastr.error("Musisz podac date, data musi być w przyszłości oraz nie może być już zajęta!", "Musisz podac date, data musi być w przyszłości oraz nie może być już zajęta!",
            {
              toastComponent: ToastrErrorComponent
            }
          )
        }
        console.log('Error!', error)

      }
    );
    this.router.navigate(['/profile']);
  }





}
