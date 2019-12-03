import {Component, OnInit} from '@angular/core';
import {Person} from "../entity/person";
import {PersonService} from "../service/person.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {select, Store} from "@ngrx/store";
import {PersonState} from "../store/pesrson.reducers";
import {Observable} from "rxjs";
import * as PersonActions from "../store/person.actions.js"

@Component({
    selector: 'app-person-list',
    templateUrl: './person-list.component.html',
    styleUrls: ['./person-list.component.scss']
})
export class PersonListComponent implements OnInit {

    persons: Observable<Person[]>;

    constructor(private readonly personService: PersonService,
                private readonly snackbar: MatSnackBar,
                private readonly store: Store<{ person: PersonState }>) {
        this.persons = this.store.select(state => state.person.persons);
    }

    ngOnInit() {
        this.store.dispatch(PersonActions.loadPersonsRequest());
    }

    deletePerson(id: number) {
        this.store.dispatch(PersonActions.deletePersonsRequest({ id }));
    }
}
