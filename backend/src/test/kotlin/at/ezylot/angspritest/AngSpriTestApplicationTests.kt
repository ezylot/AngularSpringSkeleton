package at.ezylot.angspritest

import org.assertj.core.api.Assertions
import org.junit.jupiter.api.Test
import org.springframework.boot.test.context.SpringBootTest

@SpringBootTest
class AngSpriTestApplicationTests {

	@Test
	fun contextLoads() {
		Assertions.assertThat(true).isTrue()
	}

}
