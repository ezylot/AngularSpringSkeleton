import {Injectable, isDevMode} from '@angular/core';
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

    public save(person: Person): Observable<Person> {
        if (person.id) {
            if (isDevMode()) console.log(`Updating person with id ${person.id}: `, person);
            return this.http.put<Person>(this.personsUrl + `/${person.id}`, person);
        } else {
            if (isDevMode()) console.log("Saving new person: ", person);
            return this.http.post<Person>(this.personsUrl, person);
        }
    }

    findById(id: Number): Observable<Person> {
        return this.http.get<Person>(this.personsUrl + `/${id}`);
    }

    delete(id: Number): Observable<Object> {
        return this.http.delete(this.personsUrl + `/${id}`);
    }
}
