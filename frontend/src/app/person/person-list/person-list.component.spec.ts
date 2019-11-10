import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {PersonListComponent} from './person-list.component';
import {PersonService} from "../service/person.service";
import {from, Observable} from "rxjs";
import {Person} from "../entity/person";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {RouterTestingModule} from "@angular/router/testing";

describe('PersonListComponent', () => {
    let component: PersonListComponent;
    let fixture: ComponentFixture<PersonListComponent>;
    let personService: PersonService;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [PersonListComponent],
            imports: [RouterTestingModule, MatSnackBarModule],
            providers: [
                { provide: PersonService, useClass: PersonMockService }
            ]
        }).compileComponents();
    }));


    beforeEach(() => {
        fixture = TestBed.createComponent(PersonListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should display user', () => {
        expect(component).toBeTruthy();
    });
});

class PersonMockService {
    findAll(): Observable<Person[]> {
        return from([
            [new Person({ id: 1, firstName: "Florian", lastName: "Schöffl" })]
        ]);
    }
}
