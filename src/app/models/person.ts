export class Person {
  firstname = '';
  lastname = '';
  birth = '';
  sex = '';

  public constructor(init?: Partial<Person>) {
    Object.assign(this, init);
  }
}
