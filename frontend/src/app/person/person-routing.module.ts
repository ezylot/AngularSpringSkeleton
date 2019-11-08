import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {PersonComponent} from './person.component';
import {PersonListComponent} from "./person-list/person-list.component";
import {PersonCreateComponent} from "./person-create/person-create.component";

const routes: Routes = [
  { path: '', component: PersonComponent },
  { path: 'list', component: PersonListComponent },
  { path: 'create', component: PersonCreateComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PersonRoutingModule {
}
