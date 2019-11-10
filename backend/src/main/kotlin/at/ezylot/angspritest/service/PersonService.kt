package at.ezylot.angspritest.service

import at.ezylot.angspritest.entity.Person
import java.util.Optional

interface PersonService {
    fun create(person: Person): Person
    fun findById(id: Long): Optional<Person>
    fun update(id: Long, person: Person): Person
    fun deleteById(id: Long): Int
    fun findAll(): Iterable<Person>
}
