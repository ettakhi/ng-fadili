import { EditPersonComponent } from './../edit-person/edit-person.component';
import { Person } from './../../models/person';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { PersonService } from 'src/app/services/person.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styles: []
})
export class DisplayComponent implements OnInit {
  displayedColumns: string[] = [
    'firstname',
    'lastname',
    'sex',
    'birth',
    'update',
    'delete'
  ];
  persons;
  constructor(
    private dialog: MatDialog,
    private fb: FormBuilder,
    private personService: PersonService
  ) {}

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
  onDeletePerson(id: string) {
    this.personService.deletePerson(id).subscribe(
      res => {
        const persons = this.persons.data.filter(p => p.id !== id);
        this.persons.data = persons;
        this.persons.data.splice();
      },
      error => console.error('error: ', error)
    );
  }

  onEditPerson(person: Person): void {
    console.log('onEditPerson clicked');
    const dialogRef = this.dialog.open(EditPersonComponent, {
      width: '250px',
      data: person
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
      this.personService.updatePerson(result).subscribe((res: Person) => {
        const persons = this.persons.data.map(p => (p.id === res.id ? res : p));
        this.persons.data = persons;
        this.persons.data.splice();
      });
    });
  }
}
