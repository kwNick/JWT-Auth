package com.example.jwt_rest;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
// import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@SpringBootApplication
public class JwtRestApplication {

	public static void main(String[] args) {
		SpringApplication.run(JwtRestApplication.class, args);

		// System.out.println("JWT REST API is running...");
		// System.out.println("You can test the API using Postman or any other API testing tool.");
		// System.out.println("Use the following endpoints:");
		// String hashedPassword = new BCryptPasswordEncoder().encode("hashedpassword1");
		// System.out.println("1. POST /authenticate - to get a JWT token\n"+hashedPassword);
	}

}
