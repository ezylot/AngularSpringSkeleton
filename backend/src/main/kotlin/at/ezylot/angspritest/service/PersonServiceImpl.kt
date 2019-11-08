package at.ezylot.angspritest.service

import at.ezylot.angspritest.entity.Person
import at.ezylot.angspritest.entity.PersonRepository
import org.springframework.stereotype.Service
import java.util.Optional

@Service
class PersonServiceImpl(private val personRepository: PersonRepository): PersonService {
    override fun create(person: Person): Person {
        return personRepository.save(person)
    }

    override fun findById(id: Long): Optional<Person> {
        return personRepository.findById(id)
    }

    override fun update(id: Long, person: Person): Person {
        val copy = person.copy(id = id)
        return personRepository.save(copy)
    }

    override fun deleteById(id: Long) {
        personRepository.deleteById(id)
    }

    override fun findAll(): Iterable<Person> {
        return personRepository.findAll()
    }

}
