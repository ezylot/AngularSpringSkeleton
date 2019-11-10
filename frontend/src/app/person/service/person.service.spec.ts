import {TestBed} from '@angular/core/testing';
import {PersonService} from "./person.service";
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {Person} from "../entity/person";

describe('PersonService', () => {

    let personService: PersonService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule
            ],
        });

        personService = TestBed.get(PersonService);
        httpMock = TestBed.get(HttpTestingController);
    });

    it('should return persons on findAll()', () => {
        personService.findAll().subscribe(persons => {
            expect(persons.length).toBe(1);
        });

        let getAllRequest = httpMock.expectOne('http://localhost:8080/api/persons');
        getAllRequest.flush([new Person({ id: 1, firstName: "Florian", lastName: "Schöffl" })]);
        httpMock.verify();
    });

    it('should be created', () => {
        const service: PersonService = TestBed.get(PersonService);
        expect(service).toBeTruthy();
    });
});
