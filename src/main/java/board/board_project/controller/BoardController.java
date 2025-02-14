package board.board_project.controller;

import board.board_project.dto.CategoryDTO;
import board.board_project.dto.UpdateBoardDTO;
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
    @GetMapping("/getCategoryData")
    public ResponseEntity<Map<String, Object>> getCategoryData(){
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
            response.put("redirectUrl", "http://localhost:5173/board");
        }else{
            response.put("message", "게시글 등록 실패");
        }

        return ResponseEntity.ok(response);
    }

    //비밀번호 확인 api -> 비밀번호 값 전달
    @GetMapping("/getPassword")
    public String getPassword(@RequestParam("board_no") int board_no){
        String passwordData = boardService.getPassword(board_no);

        return passwordData;
    }

    //글 수정폼 데이터 뿌려주는 api -> react에 데이터를 전달해서 그걸 화면에 뿌려줄거임
    @GetMapping("/getBoarDetail")
    public ResponseEntity<BoardVO> getBoarDetail(@RequestParam("board_no") int board_no){
        BoardVO boardDetailData = boardService.getBoardDetail(board_no);

        return ResponseEntity.ok(boardDetailData);
    }

    //글 수정(Update) api
    @PostMapping("/updateBoard")
    public ResponseEntity<Map<String, String>> updateBoard(@RequestBody UpdateBoardDTO updateBoardDTO){
        int result = boardService.updateBoard(updateBoardDTO);

        Map<String, String> response = new HashMap<>();
        if(result>0){
            //수정 성공
            response.put("message", "게시글 수정 성공");
            //상세페이지로 이동
            response.put("redirectUrl", "http://localhost:5173/board?board_no="+updateBoardDTO.getBoard_no());
        }else{
            response.put("message", "게시글 수정 실패");
        }

        return ResponseEntity.ok(response);
    }

    //글 삭제



}
