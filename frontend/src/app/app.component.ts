import {Component, HostBinding, OnInit} from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    title = 'frontend';
    navigationVisible: boolean = false;

    toggleNavigationVisibility() {
        this.navigationVisible = !this.navigationVisible;
    }
}
