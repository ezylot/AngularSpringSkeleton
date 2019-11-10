import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {ReactiveFormsModule} from '@angular/forms';

import {PersonEditComponent} from './person-edit.component';
import {MatInputModule} from "@angular/material/input";
import {PersonService} from "../service/person.service";
import {RouterTestingModule} from "@angular/router/testing";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {NoopAnimationsModule} from "@angular/platform-browser/animations";

describe('PersonEditComponent', () => {
    let component: PersonEditComponent;
    let fixture: ComponentFixture<PersonEditComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [PersonEditComponent],
            imports: [
                RouterTestingModule,
                ReactiveFormsModule,
                MatInputModule,
                MatSnackBarModule,
                NoopAnimationsModule
            ],
            providers: [
                { provide: PersonService, useClass: PersonMockService }
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PersonEditComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

class PersonMockService {

}
