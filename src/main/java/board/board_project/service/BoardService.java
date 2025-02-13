package board.board_project.service;

import board.board_project.dto.CategoryDTO;
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
}
