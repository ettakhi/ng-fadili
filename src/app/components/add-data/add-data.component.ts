import { AngularFirestore } from '@angular/fire/firestore';
import { PersonService } from './../../services/person.service';
import { Person } from './../../models/person';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-data',
  templateUrl: './add-data.component.html',
  styles: []
})
export class AddDataComponent implements OnInit {
  @Output() personEvent = new EventEmitter<Person>();

  formAdd: FormGroup;

  constructor(
    private db: AngularFirestore,
    private fb: FormBuilder,
    private personService: PersonService
  ) {}

  ngOnInit() {
    this.initForm();
  }
  initForm() {
    this.formAdd = this.fb.group({
      firstname: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      sex: ['', [Validators.required]],
      birth: ['', [Validators.required]]
    });
  }

  onSubmit() {
    if (this.formAdd.valid) {
      this.personService.addPerson(this.person).subscribe(
        res => this.formAdd.reset(new Person()),
        err => {
          console.error('error:', err);
          this.formAdd.reset(new Person());
        }
      );
    }
  }
  get person() {
    return {
      firstname: this.formAdd.get('firstname').value,
      lastname: this.formAdd.get('lastname').value,
      sex: this.formAdd.get('sex').value,
      birth: this.formAdd.get('birth').value
    };
  }
}
