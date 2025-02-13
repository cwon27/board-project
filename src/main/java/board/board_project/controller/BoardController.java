package board.board_project.controller;

import board.board_project.dto.CategoryDTO;
import board.board_project.service.BoardService;
import board.board_project.vo.BoardVO;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Slf4j
@RestController
@RequestMapping("/api/board")
public class BoardController {
    private final BoardService boardService;

    public BoardController(BoardService boardService) {
        this.boardService = boardService;
    }

    //카테고리 값 뿌려주는 api
    @GetMapping("/getcategoryData")
    public ResponseEntity<Map<String, Object>> getcategoryData(){
        //공통코드 : 공통코드명
        //공통코드 테이블에서 데이터 가져오기
        List<CategoryDTO> categoryData = boardService.getCategoryData();

        Map<String, Object> response = new HashMap<>();
        response.put("categoryData",categoryData);

        return  ResponseEntity.ok(response);
    }

    //글 등록(Create) api
    @PostMapping("/saveBoard")
    public ResponseEntity<Map<String, String>> saveBoard(@RequestBody BoardVO boardVO){
        int result = boardService.saveBoard(boardVO);

        Map<String, String> response = new HashMap<>();
        if(result>0){
            //저장 성공
            response.put("message", "게시글 등록 성공");
            //window.location.href = response.redirectUrl으로 사용할 거임
//            response.put("redirectUrl", "http://localhost:5173/board");
        }else{
            response.put("message", "게시글 등록 실패");
        }

        return ResponseEntity.ok(response);
    }



    
    
}
