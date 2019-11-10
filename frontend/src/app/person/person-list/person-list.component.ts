import {Component, OnInit} from '@angular/core';
import {Person} from "../entity/person";
import {PersonService} from "../service/person.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {map,} from "rxjs/operators";

@Component({
    selector: 'app-person-list',
    templateUrl: './person-list.component.html',
    styleUrls: ['./person-list.component.scss']
})
export class PersonListComponent implements OnInit {

    persons: Person[];

    constructor(private readonly personService: PersonService,
                private readonly snackbar: MatSnackBar) {
    }

    ngOnInit() {
        this.personService.findAll().subscribe(data => {
            this.persons = data;
        });
    }

    deletePerson(id: Number) {
        this.personService.delete(id).subscribe(() => {
            this.snackbar.open(`Deleted person with ID ${id}`);
            this.persons = this.persons.filter(value => value.id != id);
        });
    }
}
