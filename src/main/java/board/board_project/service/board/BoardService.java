package board.board_project.service.board;

import board.board_project.dto.request.board.SaveBoardDTO;
import board.board_project.dto.request.board.SearchBoardDTO;
import board.board_project.dto.request.board.UpdateBoardDTO;
import board.board_project.dto.response.board.BoardDetailDTO;
import board.board_project.dto.response.board.BoardListDTO;
import board.board_project.mapper.board.BoardMapper;
import board.board_project.service.file.FileService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.List;

@Slf4j
@Service
public class BoardService {
    private final BoardMapper boardMapper;
    private final FileService fileService;

    public BoardService(BoardMapper boardMapper, FileService fileService) {
        this.boardMapper = boardMapper;
        this.fileService = fileService;
    }

    //글 등록시 유효성 검사
    public void checkData(SaveBoardDTO saveBoardDTO) {
        //1. 카테고리
        if (saveBoardDTO.getCategory_cd() == null || saveBoardDTO.getCategory_cd().trim().isEmpty() || saveBoardDTO.getCategory_cd().equals("ALL")) {
            throw new IllegalArgumentException("카테고리 값이 유효하지 않습니다.");
        }

        //2. 제목
        if (saveBoardDTO.getTitle() == null || saveBoardDTO.getTitle().trim().isEmpty()) {
            throw new IllegalArgumentException("제목 값이 없습니다.");
        }

        if (saveBoardDTO.getTitle().length() > 200) {
            throw new IllegalArgumentException("제목은 200자를 넘을 수 없습니다.");
        }

        //3. 내용
        if (saveBoardDTO.getCont() == null || saveBoardDTO.getCont().trim().isEmpty()) {
            throw new IllegalArgumentException("내용 값이 없습니다.");
        }

        //4. 작성자명
        if (saveBoardDTO.getWriter_nm() == null || saveBoardDTO.getWriter_nm().trim().isEmpty()) {
            throw new IllegalArgumentException("작성자 값이 없습니다.");
        }

        if (saveBoardDTO.getWriter_nm().length() > 50) {
            throw new IllegalArgumentException("작성자명은 50자를 넘을 수 없습니다.");
        }

        //5. 비밀번호
        if (saveBoardDTO.getPassword() == null || saveBoardDTO.getPassword().trim().isEmpty()) {
            throw new IllegalArgumentException("비밀번호 값이 없습니다.");
        }

        if (saveBoardDTO.getPassword().length() > 100) {
            throw new IllegalArgumentException("비밀번호는 100자를 넘을 수 없습니다.");
        }
    }

    //글 & 파일 저장
    @Transactional
    public void saveBoardAndFiles(SaveBoardDTO saveBoardDTO, List<MultipartFile> fileItems) {
        //글 등록
        int result = boardMapper.saveBoard(saveBoardDTO);

        int board_no = saveBoardDTO.getBoard_no();
        log.info("*****BoardServie board_no : {}", board_no);

        if (result <= 0) {
            throw new RuntimeException("게시물 등록 실패");
        }

        try {
            //파일 등록
            fileService.saveFiles(fileItems, board_no);
        } catch (Exception e) {
            throw new RuntimeException("파일 등록 실패", e);
        }
    }
    
    //글 상세 데이터 GET
    public BoardDetailDTO getBoardDetail(int board_no) {
        BoardDetailDTO boardDetailData = boardMapper.getBoardDetail(board_no);
        if (boardDetailData == null) {
            throw new IllegalArgumentException(board_no + "번 게시글이 존재하지 않습니다.");
        }

        return boardDetailData;
    }

    //비밀번호 가져오기
    public String getBoardPw(int board_no) {
        return boardMapper.getBoardPw(board_no);
    }

    //글 수정
    @Transactional
    public void updateBoardAndFiles(UpdateBoardDTO updateBoardDTO, List<MultipartFile> fileItems) {
        //글 수정
        int result = boardMapper.updateBoard(updateBoardDTO);

        if(result<=0){
            throw new RuntimeException("게시물 수정 실패");
        }

        try {
            fileService.saveFiles(fileItems, updateBoardDTO.getBoard_no());
        }catch (Exception e){
            throw new RuntimeException("파일 수정 실패", e);
        }
    }

    //글 삭제
    @Transactional
    public void deleteBoard(int board_no) {
        log.info("삭제 요청: board_no = {}", board_no);

        try {
            //파일 삭제
            log.info("파일 삭제 진행: board_no = {}", board_no);
            fileService.deleteFileAll(board_no);

            //글 삭제
            int result = boardMapper.deleteBoard(board_no);

            if (result <= 0) {
                log.error("게시물 삭제 실패: board_no = {}", board_no);
                throw new RuntimeException("게시물 삭제 실패");
            }

        } catch (Exception e) {
            log.error("파일 삭제 중 오류 발생: board_no = {}, error = {}", board_no, e.getMessage());

            throw new RuntimeException("파일 삭제 실패", e);
        }
    }

    //전체 글 데이터 GET
    public List<BoardListDTO> getBoardList(SearchBoardDTO searchBoardDTO) {
        searchBoardDTO.calculateOffset();

        return boardMapper.getBoardList(searchBoardDTO);
    }

    //날짜 계산해서 isNew 체크
    public List<BoardListDTO> isNewCheck(List<BoardListDTO> boardList) {
        //오늘 날짜
        LocalDate today = LocalDate.now();

        //비교
        boardList.forEach(board -> {
            long dayDifference = Math.abs(ChronoUnit.DAYS.between(LocalDate.parse(board.getReg_dt()), today));
            board.set_new(dayDifference < 4);
        });

        return boardList;
    }

    //파일 존재하는지 체크
    public List<BoardListDTO> isFileCheck(List<BoardListDTO> boardList){
        boardList.forEach(board->{
            //파일 갯수 받아오기
            int fileCnt = boardMapper.getFileCnt(board.getBoard_no());
            board.set_file(fileCnt>0);
        });

        return boardList;
    }

    //총 데이터 갯수 GET
    public int getTotalListAmount(SearchBoardDTO searchBoardDTO) {
        return boardMapper.getTotalListAmount(searchBoardDTO);
    }

    //조회수
    public void viewCount(int board_no) {
        boardMapper.viewCount(board_no);
    }
}
