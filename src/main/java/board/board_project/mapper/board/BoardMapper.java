package board.board_project.mapper.board;

import board.board_project.dto.request.board.SaveBoardDTO;
import board.board_project.dto.request.board.SearchBoardDTO;
import board.board_project.dto.request.board.UpdateBoardDTO;
import board.board_project.dto.response.board.BoardDetailDTO;
import board.board_project.dto.response.board.BoardListDTO;
import board.board_project.dto.response.common.CategoryDTO;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.List;

@Mapper
@Repository
public interface BoardMapper {
    //mapper과 연결되는 메서드 작성
    //글 등록
    int saveBoard(SaveBoardDTO saveBoardDTO);

    //글 상세 데이터 GET
    BoardDetailDTO getBoardDetail(int board_no);

    //비밀번호 가져오기
    String getBoardPw(int board_no);

    //글 수정
    int updateBoard(UpdateBoardDTO updateBoardDTO);

    //글 삭제
    int deleteBoard(int board_no);

    //전체 글 데이터 GET
    List<BoardListDTO> getBoardList(SearchBoardDTO searchBoardDTO);

    //파일 갯수 GET
    int getFileCnt(int board_no);

    //총 데이터 갯수 GET
    int getTotalListAmount(SearchBoardDTO searchBoardDTO);

    //조회수
    void viewCount(int board_no);
}
