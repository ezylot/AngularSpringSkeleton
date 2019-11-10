import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {PersonRoutingModule} from './person-routing.module';
import {PersonListComponent} from "./person-list/person-list.component";
import {ReactiveFormsModule} from "@angular/forms";
import {PersonEditComponent} from './person-edit/person-edit.component';
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";


@NgModule({
    declarations: [
        PersonListComponent,
        PersonEditComponent
    ],
    imports: [
        CommonModule,
        PersonRoutingModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatInputModule
    ]
})
export class PersonModule {
}
