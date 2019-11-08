package at.ezylot.angspritest.entity

import org.springframework.data.repository.CrudRepository

interface PersonRepository: CrudRepository<Person, Long> {
}
