import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {PersonListComponent} from "./person-list/person-list.component";
import {PersonEditComponent} from "./person-edit/person-edit.component";

const routes: Routes = [
    { path: 'list', component: PersonListComponent },
    { path: 'create', component: PersonEditComponent },
    { path: 'edit/:id', component: PersonEditComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PersonRoutingModule {
}
