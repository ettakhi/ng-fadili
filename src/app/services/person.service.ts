import { Person } from './../models/person';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PersonService {
  private readonly URL_PERSONS = 'https://api.myjson.com/bins/17bfn0'; // TODO

  constructor(private http: HttpClient) {}

  getAll(): Observable<Person[]> {
    return this.http.get<Person[]>(this.URL_PERSONS);
  }

  getPerson(id: string): Observable<Person> {
    return this.http.get<Person>(`${this.URL_PERSONS}/${id}`);
  }

  addPerson(person: Person) {
    return this.http.post(this.URL_PERSONS, person);
  }

  deletePerson(id: string) {
    return this.http.delete(`${this.URL_PERSONS}/${id}`);
  }
  updatePerson(person: Person) {
    return this.http.put(this.URL_PERSONS, person);
  }
}
