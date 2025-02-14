package board.board_project.mapper;

import board.board_project.dto.BoardListDTO;
import board.board_project.dto.CategoryDTO;
import board.board_project.dto.SaveBoardDTO;
import board.board_project.dto.UpdateBoardDTO;
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
    int saveBoard(SaveBoardDTO saveBoardDTO);

    //비밀번호 값 GET
    String getPassword(int board_no);

    //글 상세 데이터 GET
    BoardVO getBoardDetail(int board_no);

    //글 수정
    int updateBoard(UpdateBoardDTO updateBoardDTO);

    //글 삭제
    int deleteBoard(int board_no);

    //전체 글 데이터 GET
    List<BoardListDTO> getBoardList(String searchCategoryType,
                                    String searchType,
                                    String searchKeyword,
                                    String sortType,
                                    int pageSize,
                                    int offset);

    //총 데이터 갯수 GET
    int getTotalListAmount();

    //조회수
    void viewCount(int board_no);
}
