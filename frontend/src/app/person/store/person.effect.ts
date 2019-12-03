import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {PersonService} from "../service/person.service";
import {
    savePersonRequest,
    deletePersonsError,
    deletePersonsRequest, deletePersonsResponse, getPersonError, getPersonRequest, getPersonResponse,
    loadPersonsError,
    loadPersonsRequest,
    loadPersonsResponse, savePersonsResponse, savePersonError
} from "./person.actions";
import {catchError, map, switchMap, tap} from "rxjs/operators";
import {of} from "rxjs";

@Injectable()
export class PersonEffects {

    constructor(
        private actions$: Actions,
        private  personService: PersonService
    ) {}

    loadPersons = createEffect(() =>
        this.actions$.pipe(
            ofType(loadPersonsRequest),
            switchMap(() => this.personService.findAll().pipe(
                map(persons => {
                    return loadPersonsResponse({ persons });
                }),
                catchError(error => {
                    return of(loadPersonsError({ error }));
                })
            ))
        )
    );

    deletePerson = createEffect(() =>
        this.actions$.pipe(
            ofType(deletePersonsRequest),
            switchMap(action => this.personService.delete(action.id).pipe(
                map(() => deletePersonsResponse({ id: action.id })),
                catchError(error => of(deletePersonsError({ error })))
            ))
        )
    );

    getPerson = createEffect(() =>
        this.actions$.pipe(
            ofType(getPersonRequest),
            switchMap(action => this.personService.findById(action.id).pipe(
                map(value => getPersonResponse({ person: value })),
                catchError(error => of(getPersonError({ error })))
            ))
        )
    );

    savePerson = createEffect(() =>
        this.actions$.pipe(
            ofType(savePersonRequest),
            switchMap(action => this.personService.save(action.person).pipe(
                tap(newPerson => action.done(newPerson)),
                map(newPerson => savePersonsResponse({ person: newPerson })),
                catchError(error => of(savePersonError({ error })))
            ))
        )
    );
}
