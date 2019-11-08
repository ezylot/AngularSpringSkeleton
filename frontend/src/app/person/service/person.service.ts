import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Person} from "../entity/person";

@Injectable({
  providedIn: 'root'
})
export class PersonService {
  private readonly personsUrl: string;

  constructor(private http: HttpClient) {
    this.personsUrl = 'http://localhost:8080/api/persons';
  }

  public findAll(): Observable<Person[]> {
    return this.http.get<Person[]>(this.personsUrl);
  }

  public save(person: Person) {
    return this.http.post<Person>(this.personsUrl, person);
  }
}
