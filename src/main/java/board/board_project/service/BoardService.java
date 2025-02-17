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
