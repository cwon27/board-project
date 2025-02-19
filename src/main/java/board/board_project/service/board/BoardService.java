package board.board_project.service.board;

import board.board_project.dto.request.board.SaveBoardDTO;
import board.board_project.dto.request.board.SearchBoardDTO;
import board.board_project.dto.request.board.UpdateBoardDTO;
import board.board_project.dto.response.board.BoardDetailDTO;
import board.board_project.dto.response.board.BoardListDTO;
import board.board_project.dto.response.common.CategoryDTO;
import board.board_project.mapper.board.BoardMapper;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BoardService {
    private final BoardMapper boardMapper;

    public BoardService(BoardMapper boardMapper) {
        this.boardMapper = boardMapper;
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

    //글 등록
    public int saveBoard(SaveBoardDTO saveBoardDTO) {
        boardMapper.saveBoard(saveBoardDTO);
        return saveBoardDTO.getBoard_no();
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
    public int updateBoard(UpdateBoardDTO updateBoardDTO) {
        return boardMapper.updateBoard(updateBoardDTO);
    }

    //글 삭제
    public int deleteBoard(int board_no) {
        return boardMapper.deleteBoard(board_no);
    }

    //전체 글 데이터 GET
    public List<BoardListDTO> getBoardList(SearchBoardDTO searchBoardDTO) {
        searchBoardDTO.calculateOffset();
        return boardMapper.getBoardList(searchBoardDTO);
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
