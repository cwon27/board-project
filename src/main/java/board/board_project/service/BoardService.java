package board.board_project.service;

import board.board_project.dto.*;
import board.board_project.mapper.BoardMapper;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BoardService {
    private final BoardMapper boardMapper;

    public BoardService(BoardMapper boardMapper) {
        this.boardMapper = boardMapper;
    }

    //카테고리 값 GET
    public List<CategoryDTO> getCategoryData() {
        return boardMapper.getCategoryData();
    }

    //글 등록시 유효성 검사
    public void checkData(SaveBoardDTO saveBoardDTO) {
        //1. 카테고리
        if (saveBoardDTO.getCategory_cd() == null || saveBoardDTO.getCategory_cd().trim().isEmpty() ||
                (!saveBoardDTO.getCategory_cd().equals("CTG001") &&
                        !saveBoardDTO.getCategory_cd().equals("CTG002") &&
                        !saveBoardDTO.getCategory_cd().equals("CTG003"))) {
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
        return boardMapper.saveBoard(saveBoardDTO);
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
    public List<BoardListDTO> getBoardList(String searchCategoryType,
                                           String searchType,
                                           String searchKeyword,
                                           String sortType,
                                           int page,
                                           int pageSize) {
        int offset = (page - 1) * pageSize;
        return boardMapper.getBoardList(searchCategoryType, searchType, searchKeyword, sortType, pageSize, offset);
    }

    //총 데이터 갯수 GET
    public int getTotalListAmount(String searchCategoryType,
                                  String searchType,
                                  String searchKeyword) {
        return boardMapper.getTotalListAmount(searchCategoryType, searchType, searchKeyword);
    }

    //조회수
    public void viewCount(int board_no) {
        boardMapper.viewCount(board_no);
    }
}
