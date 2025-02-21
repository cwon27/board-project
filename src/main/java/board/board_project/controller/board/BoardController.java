package board.board_project.controller.board;

import board.board_project.dto.request.board.SaveBoardDTO;
import board.board_project.dto.request.board.SearchBoardDTO;
import board.board_project.dto.request.board.UpdateBoardDTO;
import board.board_project.dto.response.board.BoardDetailDTO;
import board.board_project.dto.response.board.BoardListDTO;
import board.board_project.service.board.BoardService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Slf4j
@RestController
@RequestMapping("/api/board")
public class BoardController {
    private final BoardService boardService;
    private final BCryptPasswordEncoder encoder;

    public BoardController(BoardService boardService, BCryptPasswordEncoder encoder) {
        this.boardService = boardService;
        this.encoder = encoder;
    }

    //글 등록(Create) api
    @PostMapping("/save")
    public ResponseEntity<Map<String, Object>> saveBoard(@RequestPart("formData") SaveBoardDTO saveBoardDTO,
                                                         @RequestPart("fileItems") List<MultipartFile> fileItems) {
        //받아온 데이터 한번 더 유효성 검사
        boardService.checkData(saveBoardDTO);

        //비번 암호화
        log.info("before : {}",saveBoardDTO.getPassword());
        saveBoardDTO.setPassword(encoder.encode(saveBoardDTO.getPassword()));

        Map<String, Object> response = new HashMap<>();

        try {
            //파일이 있는 경우에만 처리
            if(fileItems != null && !fileItems.isEmpty()){
                boardService.saveBoardAndFiles(saveBoardDTO,fileItems);

                response.put("success",true);
                return ResponseEntity.ok(response);
            }else{
                response.put("success",false);
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
            }
        }catch (Exception e){
            response.put("success",false);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    //비밀번호 확인 api
    @PostMapping("/checkPassword/{boardNo}")
    public ResponseEntity<Map<String, Object>> checkPassword(@PathVariable("boardNo") int boardNo,
                                                             @RequestBody String password) {
        log.info(password);

        //암호화된 비번 가져오기
        String encodePw = boardService.getBoardPw(boardNo);

        Map<String, Object> response = new HashMap<>();

        //비번 비교
        if (encodePw != null && encoder.matches(password, encodePw)) {
            response.put("success", true);
        } else {
            response.put("success", false);
        }

        return ResponseEntity.ok(response);
    }

    //글 수정(Update) api
    @PutMapping("/update")
    public ResponseEntity<Map<String, Object>> updateBoard(@RequestBody UpdateBoardDTO updateBoardDTO) {
        int result = boardService.updateBoard(updateBoardDTO);

        Map<String, Object> response = new HashMap<>();
        if (result > 0) {
            //수정 성공
            response.put("success", true);
        } else {
            response.put("success", false);
        }

        return ResponseEntity.ok(response);
    }

    //글 삭제(Delete) api
    @DeleteMapping("/delete/{boardNo}")
    public ResponseEntity<Map<String, Object>> deleteBoard(@PathVariable("boardNo") int boardNo) {
        Map<String, Object> response = new HashMap<>();

        log.info("*************boardNO : {}",boardNo);//잘 옴

        try {
            boardService.deleteBoard(boardNo);

            response.put("success",true);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            response.put("success",false);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    //전체 리스트 Read api
    @PostMapping("/list")
    public ResponseEntity<Map<String, Object>> getBoardList(@RequestBody SearchBoardDTO searchBoardDTO) {
        //총 데이터 갯수(검색조건 포함)
        int totalListAmount = boardService.getTotalListAmount(searchBoardDTO);

        List<BoardListDTO> boardList = (totalListAmount > 0)
                ? boardService.getBoardList(searchBoardDTO)
                : Collections.emptyList();

        //isNew 검사
        boardList = boardService.isNewCheck(boardList);

        //파일 갯수 여부
        boardList = boardService.isFileCheck(boardList);

        //전체 페이지 수
        int totalPages = (int) Math.ceil((double) totalListAmount/ searchBoardDTO.getPageSize());

        Map<String, Object> response = new HashMap<>();
        response.put("boardList", boardList);
        response.put("totalListAmount", totalListAmount);
        response.put("totalPages",totalPages);

        return ResponseEntity.ok(response);
    }

    //글 상세 Read api -> react에 데이터를 전달해서 그걸 화면에 뿌려줄거임(수정시에도 사용)
    @GetMapping("/listDetail/{board_no}")
    public ResponseEntity<BoardDetailDTO> getBoarDetail(@PathVariable("board_no") int board_no) {
        BoardDetailDTO boardDetailData = boardService.getBoardDetail(board_no);

        return ResponseEntity.ok(boardDetailData);
    }

    //조회수 처리 api
    @GetMapping("/viewCount/{board_no}")
    public void viewCount(@PathVariable("board_no") int board_no) {
        boardService.viewCount(board_no);
    }
}
