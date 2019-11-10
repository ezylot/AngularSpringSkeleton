package at.ezylot.angspritest.controller

import at.ezylot.angspritest.entity.Person
import at.ezylot.angspritest.service.PersonService
import org.springframework.dao.EmptyResultDataAccessException
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.CrossOrigin
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.PutMapping
import org.springframework.web.servlet.support.ServletUriComponentsBuilder
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.DeleteMapping
import org.springframework.web.bind.annotation.RequestMethod.*

@RestController
@CrossOrigin(origins = ["http://localhost:4200", "http://localhost:8080"], methods = [DELETE, POST, GET, PUT, OPTIONS])
@RequestMapping("/api/persons")
class PersonController(private val personService: PersonService) {
    @GetMapping("")
    fun retrieveAllPersons(): Iterable<Person> {
        return personService.findAll()
    }

    @GetMapping("/{id}")
    fun retrievePerson(@PathVariable id: Long): ResponseEntity<Person> {
        val person = personService.findById(id)
        return if (!person.isPresent) {
            ResponseEntity.notFound().build()
        } else {
            ResponseEntity.ok(person.get())
        }
    }

    @DeleteMapping("/{id}")
    fun deletePerson(@PathVariable id: Long): ResponseEntity<Any> {
        return try {
            personService.deleteById(id)
            ResponseEntity.ok().build()
        } catch (e: EmptyResultDataAccessException) {
            ResponseEntity.notFound().build()
        }
    }

    @PostMapping("")
    fun createPerson(@RequestBody person: Person): ResponseEntity<Person> {
        val savedPerson = personService.create(person)
        val location = ServletUriComponentsBuilder.fromCurrentRequest()
            .path("/{id}")
            .buildAndExpand(savedPerson.id)
            .toUri()

        return ResponseEntity
            .created(location)
            .body(savedPerson)
    }

    @PutMapping("/{id}")
    fun updatePerson(@RequestBody person: Person, @PathVariable id: Long): ResponseEntity<Person> {
        val personOptional = personService.findById(id)
        return if (!personOptional.isPresent) {
            ResponseEntity.notFound().build()
        } else {
            ResponseEntity.ok(personService.update(id, person))
        }
    }
}
