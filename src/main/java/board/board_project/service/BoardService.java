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

    //글 수정폼 데이터 GET
    public BoardVO getBoardDetail(int board_no){
        return boardMapper.getBoardDetail(board_no);
    }

    //글 수정
    public int updateBoard(UpdateBoardDTO updateBoardDTO){
        return boardMapper.updateBoard(updateBoardDTO);
    }
}
