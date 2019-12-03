import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {PersonService} from "../service/person.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Person} from "../entity/person";
import {MatSnackBar} from "@angular/material/snack-bar";
import {PersonState} from "../store/pesrson.reducers";
import {Store} from "@ngrx/store";
import * as PersonActions from "../store/person.actions";

@Component({
    selector: 'app-person-edit',
    templateUrl: './person-edit.component.html',
    styleUrls: ['./person-edit.component.scss']
})
export class PersonEditComponent implements OnInit {
    private person = this.fb.group({
        id: [''],
        firstName: ['', Validators.required],
        lastName: ['', Validators.required]
    });

    constructor(private personService: PersonService,
                private route: ActivatedRoute,
                private router: Router,
                private fb: FormBuilder,
                private readonly snackbar: MatSnackBar,
                private readonly store: Store<{ person: PersonState }>) {
    }

    ngOnInit() {
        this.store.select(state => state.person.personToEdit).subscribe(personToEdit => {
            if(personToEdit == null) return;

            this.person.setValue({
                id: personToEdit.id,
                firstName: personToEdit.firstName,
                lastName: personToEdit.lastName,
            })
        });

        let id = this.route.snapshot.paramMap.get("id");
        if (id) {
            this.store.dispatch(PersonActions.getPersonRequest({ id: Number(id) }));
        }
    }

    onSubmit() {
        this.store.dispatch(PersonActions.savePersonRequest({
            person: new Person(this.person.value),
            done: (person: Person) => {
                if (person.id) {
                    this.snackbar.open(`Updated person with id ${person.id}`)
                } else {
                    this.snackbar.open(`Created person with id ${person.id}`)
                }
                this.router.navigate(['/person/list'])
            }
        }));
    }
}
