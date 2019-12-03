import {Person} from "../entity/person";
import {Action, createReducer, on} from "@ngrx/store";
import * as PersonActions from "./person.actions";

export const personFeatureKey = 'person';

export interface PersonState {
    persons: Person[],
    personToEdit: Person | null
}

export const initialState: PersonState = {
    persons: [],
    personToEdit: null
};

const personReducer = createReducer(initialState,
    on(PersonActions.loadPersonsResponse, (state, action) => ({
        persons: action.persons
    })),

    on(PersonActions.getPersonResponse, (state, action) => ({
        ...state,
        personToEdit: action.person
    })),

    on(PersonActions.deletePersonsResponse, (state, action) => ({
        ...state,
        persons: state.persons.filter(value => value.id != action.id)
    })),

    on(PersonActions.loadPersonsError,
        PersonActions.deletePersonsError,
        PersonActions.getPersonError,
        PersonActions.savePersonError,
        (state, action) => {
            console.error("error while communicating with person api", action.error);
            return state;
        }),
);

export function reducer(state: PersonState | undefined, action: Action) {
    return personReducer(state, action);
}
