package co.edu.unbosque;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@ComponentScan(basePackages = "co.edu.unbosque")
@EntityScan(basePackages = "co.edu.unbosque.entity")
@EnableJpaRepositories(basePackages = "co.edu.unbosque.repository")
public class AccionesElBosqueApplication {

	public static void main(String[] args) {
		SpringApplication.run(AccionesElBosqueApplication.class, args);
	}

}
