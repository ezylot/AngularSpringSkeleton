import {Action, createReducer, on} from "@ngrx/store";
import {toggleNavigation} from "./app.actions";


export interface AppState {
    navigationVisible: boolean
}

const defaultAppState: AppState = {
    navigationVisible: false
};

const appReducer = createReducer(defaultAppState,
    on(toggleNavigation, (state: AppState, action: Action) => {
        console.log(`Toggling navigation to: ${!state.navigationVisible}`)
        return {
            navigationVisible: !state.navigationVisible
        }
    })
);

export function reducer(state: AppState | undefined, action: Action) {
    return appReducer(state, action);
}
