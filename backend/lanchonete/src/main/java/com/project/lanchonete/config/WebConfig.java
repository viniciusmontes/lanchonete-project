package com.project.lanchonete.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;


@Configuration
@EnableWebMvc
public class WebConfig implements WebMvcConfigurer {

	@SuppressWarnings("null")
	@Override
	public void addCorsMappings(CorsRegistry registry) {
		registry.addMapping("/**")
				.allowedOrigins("http://localhost:5173") // Especifica a origem permitida
				.allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS") // Métodos permitidos
				.allowedHeaders("*") // Cabeçalhos permitidos
				.allowCredentials(true); // Permite credenciais
	}
}