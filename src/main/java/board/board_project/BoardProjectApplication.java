package board.board_project;

import com.ulisesbocchio.jasyptspringboot.annotation.EnableEncryptableProperties;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@EnableEncryptableProperties
public class BoardProjectApplication {

	public static void main(String[] args) {
		SpringApplication.run(BoardProjectApplication.class, args);
	}

}
