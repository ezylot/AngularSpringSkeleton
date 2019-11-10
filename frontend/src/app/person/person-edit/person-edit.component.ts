import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {PersonService} from "../service/person.service";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {Person} from "../entity/person";
import {switchMap} from "rxjs/operators";
import {MatSnackBar} from "@angular/material/snack-bar";

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
                private readonly snackbar: MatSnackBar) {
    }

    ngOnInit() {
        let id = this.route.snapshot.paramMap.get("id");
        if (id) {
            this.personService.findById(Number(id)).subscribe(loadedPerson => {
                this.person.setValue({
                    id: loadedPerson.id,
                    firstName: loadedPerson.firstName,
                    lastName: loadedPerson.lastName,
                })
            })
        }
    }

    onSubmit() {
        this.personService.save(new Person(this.person.value))
            .subscribe(val => {
                let id = this.route.snapshot.paramMap.get("id");
                if(id) {
                    this.snackbar.open(`Updated person with id ${val.id}`)
                } else {
                    this.snackbar.open(`Created person with id ${val.id}`)
                }
                this.router.navigate(['/person/list'])
            });
    }
}
