import { AngularFirestore } from '@angular/fire/firestore';
import { Person } from './../models/person';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PersonService {
  private persons = this.db.collection('persons');
  private readonly URL_PERSONS = 'https://api.myjson.com/bins/o7mu4'; // TODO

  constructor(private http: HttpClient, private db: AngularFirestore) {}

  getAll(): Observable<Person[]> {
    return this.persons.snapshotChanges().pipe(
      tap(res => console.log(res)),
      map(actions =>
        actions.map(a => {
          const data = a.payload.doc.data() as Person;
          const id = a.payload.doc.id;
          return { id, ...data };
        })
      )
    );
  }

  getPerson(id: string): Observable<Person> {
    return this.http.get<Person>(`${this.URL_PERSONS}/${id}`);
  }

  addPerson(person: Person) {
    return from(this.persons.add(person));
  }

  deletePerson(id: string) {
    return this.persons.doc(id).delete();
    // return this.http.delete(`${this.URL_PERSONS}/${id}`);
  }
  updatePerson(person: Person) {
    const { id, ...rest } = person;
    return this.persons.doc(id).update(rest);
  }
}
