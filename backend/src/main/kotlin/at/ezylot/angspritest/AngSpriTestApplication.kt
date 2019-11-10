package at.ezylot.angspritest

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication
import org.springframework.cache.annotation.EnableCaching
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.ComponentScan
import org.springframework.web.servlet.config.annotation.CorsRegistry
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer



@SpringBootApplication
@EnableCaching
class AngSpriTestApplication

fun main(args: Array<String>) {
	runApplication<AngSpriTestApplication>(*args)
}
