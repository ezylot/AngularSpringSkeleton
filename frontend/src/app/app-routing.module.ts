import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {PageNotFoundComponent} from "./page-not-found/page-not-found.component";
import {HomeComponent} from "./home/home.component";
import {QuicklinkStrategy} from "ngx-quicklink";

const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'person', loadChildren: () => import('./person/person.module').then(m => m.PersonModule) },
    { path: '**', component: PageNotFoundComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { preloadingStrategy: QuicklinkStrategy })],
    exports: [RouterModule]
})
export class AppRoutingModule {

}
