import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, forkJoin, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AnimalsService {

  private apiUrl = 'http://localhost:8000/api/v1/pets';  // Replace with your API endpoint

  constructor(private http: HttpClient) {

   }

   getAnimals(page: number = 1): Observable<AnimalsResponse> {
    return this.http.get<any>(`${this.apiUrl}?page=${page}`).pipe(
      map(response => ({
        animals: response.data.map((item: any) => this.transformToAnimal(item)),
        response: response
      }))
    );
  }
  getFavorites(): Observable<Animal[]> {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    return forkJoin<Animal[]>(favorites.map((id: string) => this.getAnimalById(id)));
  }

  postInvoice(date: string, petId: number): Observable<any>{
    const url = 'http://localhost:8000/api/invoice/store';

    const token = localStorage.getItem('token');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    };
    const body = {
      date: date,
      pet_id: petId
    };

    return this.http.post(url, body, httpOptions);

  }
  getAnimalById(id: string): Observable<Animal>{
    return this.http.get<any>(this.apiUrl + '/' + id).pipe(
      map(response => this.transformToAnimal(response.data))
    );
  }
  private transformToAnimal(item: any): Animal {
    return {
      id: item.id,
      name: item.name,
      race: item.race,
      gender: item.gender,
      age: item.age,
      description: item.description,
      image: item.image,
      invoiceId: item.invoiceId
    };
  }
}
export interface AnimalsResponse {
  animals: Animal[];
  response: any;
}
export interface Animal {
  id: number;
  name: string;
  race: string;
  gender: string;
  age: number;
  description: string;
  image: string;
  invoiceId: number;
}
