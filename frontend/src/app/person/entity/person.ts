export class Person {
  id: number;
  firstName: string;
  lastName: string;

  public constructor(init?: Partial<Person >) {
    Object.assign(this, init);
  }
}
