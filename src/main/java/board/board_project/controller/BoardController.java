package board.board_project.controller;

import board.board_project.dto.*;
import board.board_project.service.BoardService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/board")
public class BoardController {
    private final BoardService boardService;
    private final BCryptPasswordEncoder encoder;

    public BoardController(BoardService boardService, BCryptPasswordEncoder encoder) {
        this.boardService = boardService;
        this.encoder = encoder;
    }

    //카테고리 값 뿌려주는 api
    @GetMapping("/getCategoryData")
    public ResponseEntity<Map<String, Object>> getCategoryData() {
        //공통코드 : 공통코드명
        //공통코드 테이블에서 데이터 가져오기
        List<CategoryDTO> categoryData = boardService.getCategoryData();

        Map<String, Object> response = new HashMap<>();
        response.put("categoryData", categoryData);

        return ResponseEntity.ok(response);
    }

    //글 등록(Create) api
    @PostMapping("/saveBoard")
    public ResponseEntity<Map<String, String>> saveBoard(@RequestBody SaveBoardDTO saveBoardDTO) {
        //비번 암호화
        saveBoardDTO.setPassword(encoder.encode(saveBoardDTO.getPassword()));
        System.out.println("pw : " + saveBoardDTO.getPassword());

        int result = boardService.saveBoard(saveBoardDTO);

        Map<String, String> response = new HashMap<>();
        if (result > 0) {
            //저장 성공
            response.put("message", "게시글 등록 성공");
            //window.location.href = response.redirectUrl으로 사용할 거임
            response.put("redirectUrl", "http://localhost:5173");
        } else {
            response.put("message", "게시글 등록 실패");
        }

        return ResponseEntity.ok(response);
    }

    //비밀번호 확인 api
    @GetMapping("/checkPassword")
    public ResponseEntity<Map<String, Object>> checkPassword(@RequestBody CheckPwDTO checkPwDTO) {
        //암호화된 비번 가져오기
        String encodePw = boardService.getBoardPw(checkPwDTO.getBoard_no());

        Map<String, Object> response = new HashMap<>();

        //비번 비교
        if (encodePw != null && encoder.matches(checkPwDTO.getPassword(), encodePw)) {
            response.put("success", true);
            response.put("message", "비밀번호 일치");
        } else {
            response.put("success", false);
            response.put("message", "비밀번호 불일치");
        }

        return ResponseEntity.ok(response);
    }

    //글 수정(Update) api
    @PutMapping("/updateBoard")
    public ResponseEntity<Map<String, String>> updateBoard(@RequestBody UpdateBoardDTO updateBoardDTO) {
        int result = boardService.updateBoard(updateBoardDTO);

        Map<String, String> response = new HashMap<>();
        if (result > 0) {
            //수정 성공
            response.put("message", "게시글 수정 성공");
            //상세페이지로 이동
            response.put("redirectUrl", "http://localhost:5173/boardDetail/" + updateBoardDTO.getBoard_no());
        } else {
            response.put("message", "게시글 수정 실패");
        }

        return ResponseEntity.ok(response);
    }

    //글 삭제(Delete) api
    @DeleteMapping("/deleteBoard")
    public ResponseEntity<Map<String, String>> deleteBoard(@RequestParam("board_no") int board_no) {
        int result = boardService.deleteBoard(board_no);

        Map<String, String> response = new HashMap<>();
        if (result > 0) {
            //삭제 성공
            response.put("message", "게시글 삭제 성공");
            //목록페이지로 이동
            response.put("redirectUrl", "http://localhost:5173");
        } else {
            response.put("message", "게시글 삭제 실패");
        }

        return ResponseEntity.ok(response);
    }

    //전체 리스트 Read api
    @GetMapping("/getBoardList")
    public ResponseEntity<Map<String, Object>> getBoardList(@RequestParam("searchCategoryType") String searchCategoryType,
                                                            @RequestParam("searchType") String searchType,
                                                            @RequestParam("searchKeyword") String searchKeyword,
                                                            @RequestParam("sortType") String sortType,
                                                            @RequestParam("page") int page,
                                                            @RequestParam("pageSize") int pageSize) {
        List<BoardListDTO> boardList = boardService.getBoardList(searchCategoryType, searchType, searchKeyword, sortType, page, pageSize);
        //총 데이터 갯수(검색조건 포함)
        int totalListAmount = boardService.getTotalListAmount(searchCategoryType, searchType, searchKeyword);

        Map<String, Object> response = new HashMap<>();
        response.put("boardList", boardList);
        response.put("totalListAmount", totalListAmount);

        return ResponseEntity.ok(response);
    }

    //글 상세 Read api -> react에 데이터를 전달해서 그걸 화면에 뿌려줄거임(수정시에도 사용)
    @GetMapping("/getBoarDetail")
    public ResponseEntity<BoardDetailDTO> getBoarDetail(@RequestParam("board_no") int board_no) {
        BoardDetailDTO boardDetailData = boardService.getBoardDetail(board_no);

        return ResponseEntity.ok(boardDetailData);
    }

    //조회수 처리 api
    @GetMapping("/viewCount")
    public void viewCount(@RequestParam("board_no") int board_no) {
        boardService.viewCount(board_no);
    }
}
