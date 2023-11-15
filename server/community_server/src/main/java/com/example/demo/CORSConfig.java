package com.example.demo;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CORSConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**") // 모든 요청에 대해 CORS 설정 적용
            .allowedOrigins("http://localhost:3000","jbc:mysql://localhos:3306") // 허용할 도메인 설정, *은 모든 도메인 허용
            .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS") // 허용할 HTTP 메서드 설정
            .allowedHeaders("*") // 허용할 헤더 설정
            .allowCredentials(true); // 크로스 도메인 요청 시 인증 정보 허용
    }
}
