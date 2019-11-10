package at.ezylot.angspritest.entity

import org.springframework.data.jpa.repository.Modifying
import org.springframework.data.jpa.repository.Query
import org.springframework.data.repository.CrudRepository

interface PersonRepository: CrudRepository<Person, Long> {
    @Query("DELETE FROM Person p WHERE p.id = ?1")
    @Modifying
    fun deleteByIdWithCount(id: Long): Int
}
