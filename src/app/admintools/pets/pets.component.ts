import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Animal } from '../../animals.service';

@Component({
  selector: 'app-pets',
  templateUrl: './pets.component.html',
  styleUrl: './pets.component.css'
})
export class PetsComponent implements OnInit{

  pets!: Animal[];


  constructor(private route: ActivatedRoute) {

  }

  ngOnInit(): void {
      this.route.data.subscribe(data => {
        console.log(data);

        this.pets = data[0].data;

        console.log(this.pets);
      });
  }
}
