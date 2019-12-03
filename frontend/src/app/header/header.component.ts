import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import * as AppActions from "../reducers/app.actions";
import {AppState} from "../reducers/app.reducers";
import {Store} from "@ngrx/store";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

    constructor(private readonly store: Store<{app: AppState}>) {
    }

    burgerButtonPressed() {
        this.store.dispatch(AppActions.toggleNavigation());
    }
}
