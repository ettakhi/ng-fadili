import { Person } from './../../models/person';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-person',
  templateUrl: './edit-person.component.html',
  styles: []
})
export class EditPersonComponent {
  constructor(
    public dialogRef: MatDialogRef<EditPersonComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Person
  ) {}

  person = { ...this.data };

  onNoClick(): void {
    this.dialogRef.close();
  }
}
