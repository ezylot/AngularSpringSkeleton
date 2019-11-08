import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PersonRoutingModule } from './person-routing.module';
import { PersonComponent } from './person.component';
import {PersonListComponent} from "./person-list/person-list.component";
import {PersonCreateComponent} from "./person-create/person-create.component";


@NgModule({
  declarations: [
    PersonComponent,
    PersonListComponent,
    PersonCreateComponent
  ],
  imports: [
    CommonModule,
    PersonRoutingModule,
  ]
})
export class PersonModule { }
