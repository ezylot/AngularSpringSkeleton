import {Component, ElementRef, HostBinding, OnInit, ViewChild} from '@angular/core';
import {Store} from "@ngrx/store";
import {AppState} from "./reducers/app.reducers";
import * as AppActions  from "./reducers/app.actions";
import {MatSidenav} from "@angular/material/sidenav";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    title = 'frontend';
    @ViewChild('sidenav', { static: true }) sidenav: MatSidenav;

    constructor(private readonly store: Store<{ app: AppState }>) {
    }

    ngOnInit(): void {
        this.store.select(state => state.app.navigationVisible).subscribe(value => {
            this.sidenav.opened = value;
        });
    }
}
