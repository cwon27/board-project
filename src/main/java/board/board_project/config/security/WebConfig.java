package board.board_project.config.security;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")  // 모든 엔드포인트에 대해 CORS 허용
                .allowedOrigins("http://localhost:5173")  // 프론트엔드 주소 허용
                .allowedMethods("GET", "POST", "PUT", "DELETE")  // 허용할 HTTP 메소드
                .allowedHeaders("*")
                .exposedHeaders("Content-Disposition")  // 이 부분이 중요합니다!
                .allowCredentials(true);
    }
}
