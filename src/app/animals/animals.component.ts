import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Animal, AnimalsResponse, AnimalsService } from '../animals.service';

@Component({
  selector: 'app-animals',
  templateUrl: './animals.component.html',
  styleUrls: ['./animals.component.css']
})
export class AnimalsComponent implements OnInit {
  animals!: Animal[];
  currentPage: number = 1;
  pagesToShow: number[] = [];
  response!: AnimalsResponse;
  baseUrl: string = 'http://localhost:8000'; // Ustaw odpowiedni adres URL


  constructor(private animalsService: AnimalsService, private router: Router) { }

  ngOnInit(): void {
    this.fetchData(this.currentPage);

    setTimeout(() => {
      console.log(this.animals);
    },3000);
  }

  fetchData(page: number): void {
    this.animalsService.getAnimals(page).subscribe(response => {
      this.response = response;
      this.animals = response.animals;
      for(let animal of this.animals){
        if(!animal.image.startsWith('https')){
        animal.image = this.baseUrl + animal.image;
        }
      }
      this.calculatePagesToShow();
    });
  }

  changePage(page: number): void {
    this.currentPage = page;
    this.fetchData(page);
  }

  calculatePagesToShow(): void {
    let totalPages = this.response.response.meta.last_page;
    let startPage = Math.max(this.currentPage - 2, 1);
    let endPage = Math.min(startPage + 4, totalPages);
    this.pagesToShow = Array.from({length: endPage - startPage + 1}, (_, i) => startPage + i);
  }

  firstPage(): void {
    this.changePage(1);
  }

  lastPage(): void {
    this.changePage(this.response.response.meta.last_page);
  }

  nextButton(animalId: number){
    localStorage.setItem('animalId', animalId.toString());
    this.router.navigate(['/animal']);
  }
}
