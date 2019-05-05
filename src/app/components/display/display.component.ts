import { Person } from './../../models/person';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { PersonService } from 'src/app/services/person.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styles: []
})
export class DisplayComponent implements OnInit {
  displayedColumns: string[] = ['firstname', 'lastname', 'sex', 'birth'];
  persons;
  constructor(private fb: FormBuilder, private personService: PersonService) {}

  ngOnInit() {
    this.personService
      .getAll()
      .subscribe(
        res => (this.persons = new MatTableDataSource(res)),
        error => console.error('error:', error)
      );
  }

  applyFilter(filterValue: string) {
    this.persons.filter = filterValue.trim().toLowerCase();
  }

  onPersonAdded(person: Person) {
    this.persons.data.push(person);
    this.persons.data = this.persons.data.slice();
  }
}
