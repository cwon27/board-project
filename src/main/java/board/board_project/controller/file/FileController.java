package board.board_project.controller.file;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Slf4j
@RestController
@RequestMapping("/api/file")
public class FileController {
    //파일 등록 api
    @PostMapping("/save")
    public ResponseEntity<Map<String, Object>> saveFile(@RequestParam("board_no") int board_no,
                                                        @RequestParam("fileItems") List<MultipartFile> fileItems) {
        log.info("************************ board_no: {}, files: {}", board_no, fileItems.size());

        Map<String, Object> response = new HashMap<>();
        response.put("success", false);

        return ResponseEntity.ok(response);
    }
}
