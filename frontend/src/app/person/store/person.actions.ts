import {createAction, props} from '@ngrx/store'
import {Person} from "../entity/person";

export const getPersonRequest = createAction('[PERSON] Get request', props<{ id: number }>());
export const getPersonResponse = createAction('[PERSON] Get response', props<{ person: Person }>());
export const getPersonError = createAction('[PERSON] Get error', props<{ error: any }>());

export const loadPersonsRequest = createAction('[PERSON] Get all request');
export const loadPersonsResponse = createAction('[PERSON] Get all response', props<{ persons: Person[] }>());
export const loadPersonsError = createAction('[PERSON] Get all error', props<{ error: any }>());

export const deletePersonsRequest = createAction('[PERSON] Delete request', props<{ id: number }>());
export const deletePersonsResponse = createAction('[PERSON] Delete response', props<{ id: number }>());
export const deletePersonsError = createAction('[PERSON] Delete error', props<{ error: any }>());

export const savePersonRequest = createAction('[PERSON] Create request', props<{ person: Person, done: {(person: Person): void} }>());
export const savePersonsResponse = createAction('[PERSON] Create response', props<{ person: Person }>());
export const savePersonError = createAction('[PERSON] Create error', props<{ error: any }>());
