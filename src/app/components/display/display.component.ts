import { EditPersonComponent } from './../edit-person/edit-person.component';
import { Person } from './../../models/person';
import { FormBuilder } from '@angular/forms';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { PersonService } from 'src/app/services/person.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styles: []
})
export class DisplayComponent implements OnInit, OnDestroy {
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
    private personService: PersonService,
    private db: AngularFirestore
  ) {}

  ngOnInit() {
    this.personService.getAll().subscribe(
      res => {
        console.log({ res });
        this.persons = new MatTableDataSource(res);
      },
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
    this.personService.deletePerson(id);
  }

  onEditPerson(person: Person): void {
    console.log('onEditPerson clicked');
    const dialogRef = this.dialog.open(EditPersonComponent, {
      width: '250px',
      data: person
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
      if (result) {
        this.personService.updatePerson(result);
      }
    });
  }
  ngOnDestroy(): void {
    // TODO unsubscribe from data
  }
}
