import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Animal, AnimalsService } from '../../animals.service';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrl: './favourites.component.css'
})
export class FavouritesComponent implements OnInit{

  animals!: Animal[];
  baseUrl: string = 'http://localhost:8000'; // Ustaw odpowiedni adres URL


  constructor(private route: ActivatedRoute, private animalService: AnimalsService, private router: Router) {

  }


  ngOnInit(): void {
    this.animalService.getFavorites().subscribe(favorites => {
      console.log(favorites);

      this.animals = favorites;

      for(let animal of this.animals){
        if(!animal.image.startsWith('https')){
        animal.image = this.baseUrl + animal.image;
        }
      }
    });

  }


  nextButton(animalId: number){
    localStorage.setItem('animalId', animalId.toString());
    this.router.navigate(['/animal']);
  }


}
