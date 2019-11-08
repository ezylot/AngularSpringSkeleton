import { Component, OnInit } from '@angular/core';
import {PersonService} from "../service/person.service";
import {Person} from "../entity/person";
import {Router} from "@angular/router";

@Component({
  selector: 'app-person-create',
  templateUrl: './person-create.component.html',
  styleUrls: ['./person-create.component.scss']
})
export class PersonCreateComponent implements OnInit {

  private person: Person;

  constructor(private personService: PersonService,
              private router: Router) { }

  ngOnSubmit() {
    this.personService.save(this.person).subscribe(result => this.router.navigate(['/person/list']))
  }

  ngOnInit() {
  }

}
