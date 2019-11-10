export class Person {
  id: Number;
  firstName: String;
  lastName: String;

  public constructor(init?: Partial<Person >) {
    Object.assign(this, init);
  }
}
