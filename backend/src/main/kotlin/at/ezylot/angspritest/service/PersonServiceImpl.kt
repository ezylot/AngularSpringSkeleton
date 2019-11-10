package at.ezylot.angspritest.service

import at.ezylot.angspritest.entity.Person
import at.ezylot.angspritest.entity.PersonRepository
import org.hibernate.annotations.Cache
import org.springframework.cache.CacheManager
import org.springframework.cache.annotation.CacheConfig
import org.springframework.cache.annotation.CacheEvict
import org.springframework.cache.annotation.CachePut
import org.springframework.cache.annotation.Cacheable
import org.springframework.cache.annotation.Caching
import org.springframework.dao.EmptyResultDataAccessException
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import java.util.Optional

const val PERSON_CACHE = "persons"
const val PERSON_CACHE_ALL = "allPersons"

@Service
class PersonServiceImpl(
    private val personRepository: PersonRepository
) : PersonService {

    @CachePut(cacheNames = [PERSON_CACHE], key = "#result.id")
    @CacheEvict(cacheNames = [PERSON_CACHE_ALL], allEntries = true)
    @Transactional
    override fun create(person: Person): Person {
        return personRepository.save(person)
    }

    @Cacheable(cacheNames = [PERSON_CACHE], key = "#id")
    @Transactional(readOnly = true)
    override fun findById(id: Long): Optional<Person> {
        return personRepository.findById(id)
    }

    @CachePut(cacheNames = [PERSON_CACHE], key = "#result.id")
    @CacheEvict(cacheNames = [PERSON_CACHE_ALL], allEntries = true)
    @Transactional
    override fun update(id: Long, person: Person): Person {
        val copy = person.copy(id = id)
        return personRepository.save(copy)
    }

    @Caching(
        evict = [
            CacheEvict(cacheNames = [PERSON_CACHE_ALL], allEntries = true),
            CacheEvict(cacheNames = [PERSON_CACHE], key = "#id")
        ]
    )
    @Transactional
    override fun deleteById(id: Long): Int {
        val count = personRepository.deleteByIdWithCount(id)
        if(count == 0) throw EmptyResultDataAccessException(1)
        return count
    }

    @Cacheable(cacheNames = [PERSON_CACHE_ALL])
    @Transactional(readOnly = true)
    override fun findAll(): Iterable<Person> {
        return personRepository.findAll()
    }

}
