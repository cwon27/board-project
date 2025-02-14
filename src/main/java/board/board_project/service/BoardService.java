package board.board_project.service;

import board.board_project.dto.CategoryDTO;
import board.board_project.dto.UpdateBoardDTO;
import board.board_project.mapper.BoardMapper;
import board.board_project.vo.BoardVO;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BoardService {
    private final BoardMapper boardMapper;

    public BoardService(BoardMapper boardMapper) {
        this.boardMapper = boardMapper;
    }

    //카테고리 값 GET
    public List<CategoryDTO> getCategoryData(){
        return boardMapper.getCategoryData();
    }

    //글 등록
    public int saveBoard(BoardVO boardVO){
        return boardMapper.saveBoard(boardVO);
    }

    //비밀번호 값 GET
    public String getPassword(int board_no){
        return boardMapper.getPassword(board_no);
    }

    //글 상세 데이터 GET
    public BoardVO getBoardDetail(int board_no){
        return boardMapper.getBoardDetail(board_no);
    }

    //글 수정
    public int updateBoard(UpdateBoardDTO updateBoardDTO){
        return boardMapper.updateBoard(updateBoardDTO);
    }
    
    //글 삭제
    public int deleteBoard(int board_no){
        return boardMapper.deleteBoard(board_no);
    }

    //전체 글 데이터 GET
    public List<BoardVO> getBoardList(String searchCategoryType,
                                      String searchType,
                                      String searchKeyword,
                                      String sortType,
                                      int page,
                                      int pageSize){
        int offset = (page-1)*pageSize;
        return boardMapper.getBoardList(searchCategoryType,searchType,searchKeyword,sortType,pageSize,offset);
    }

    //총 데이터 갯수 GET
    public int getTotalListAmount(){
        return boardMapper.getTotalListAmount();
    }

    //조회수
    public void viewCount(int board_no){
        boardMapper.viewCount(board_no);
    }
}
