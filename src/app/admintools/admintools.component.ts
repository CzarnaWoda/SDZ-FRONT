import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Modal, initFlowbite } from 'flowbite';
import { PetsService } from './pets/pets.service';
import { ToastrService } from 'ngx-toastr';
import { ToastrErrorComponent } from '../toastr/toastrerror.component';
import { ToastrSuccessComponent } from '../toastr/toastrsucess.component';

@Component({
  selector: 'app-admintools',
  templateUrl: './admintools.component.html',
  styleUrl: './admintools.component.css'
})
export class AdmintoolsComponent implements OnInit{

  constructor(private router: Router, private petService: PetsService, private toastr: ToastrService){

  }
  pet = {
    name: '',
    race: '',
    gender: '',
    age: 0,
    description: '',
    invoice_id: 0
  };
  imageFile: File | null = null;

  ngOnInit(): void {
      setTimeout(() => {
        initFlowbite();
      },200);
  }
  onSubmit(){
    const formData = new FormData();
    formData.append('name', this.pet.name);
    formData.append('race', this.pet.race);
    formData.append('gender', this.pet.gender);
    formData.append('age', this.pet.age.toString());
    formData.append('description', this.pet.description);
    if (this.imageFile) {
      formData.append('image', this.imageFile);
    }else{
      this.toastr.error('Musisz dodać zdjęcie', 'Musisz dodać zdjęcie', {
        toastComponent: ToastrErrorComponent
      });
      return;
    }

    formData.forEach((value, key) => {
      console.log(`${key}: ${value}`);
    });
    this.petService.addPet(formData).subscribe(
      response => {
        console.log('Pet added successfully', response);
        const target = document.getElementById('crud-modal');

        const modal = new Modal(target);

        modal.hide();
        this.toastr.success('Zwierze dodane pomyślnie', 'Zwierze dodane pomyślnie',{
          toastComponent: ToastrSuccessComponent
        });
      },
      error => {
        console.error('Error adding pet', error);
      }
    );
  }

  usersRoute(){
    this.router.navigate(['/admintools/users']);
  }
  petsRoute(){
    this.router.navigate(['/admintools/pets']);
  }
  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      this.imageFile = event.target.files[0];
    }
  }
}
