export class Person {
  id?: string;
  firstname = '';
  lastname = '';
  birth = '';
  sex = '';

  public constructor(init?: Partial<Person>) {
    Object.assign(this, init);
  }
}
