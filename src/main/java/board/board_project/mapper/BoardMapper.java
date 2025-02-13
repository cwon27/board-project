package board.board_project.mapper;

import board.board_project.dto.CategoryDTO;
import board.board_project.vo.BoardVO;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.List;

@Mapper
@Repository
public interface BoardMapper {
    //mapper과 연결되는 메서드 작성
    //카테고리 값 GET
    List<CategoryDTO> getCategoryData();

    //글 등록
    int saveBoard(BoardVO boardVO);
}
