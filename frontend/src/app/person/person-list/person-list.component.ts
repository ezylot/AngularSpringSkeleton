import { Component, OnInit } from '@angular/core';
import {Person} from "../entity/person";
import {PersonService} from "../service/person.service";

@Component({
  selector: 'app-person-list',
  templateUrl: './person-list.component.html',
  styleUrls: ['./person-list.component.scss']
})
export class PersonListComponent implements OnInit {

  persons: Person[];

  constructor(private readonly personService: PersonService) { }

  ngOnInit() {
    this.personService.findAll().subscribe(data => {
      this.persons = data;
    })
  }

}
