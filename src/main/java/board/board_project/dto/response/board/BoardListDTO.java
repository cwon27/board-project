package board.board_project.dto.response.board;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BoardListDTO {
    private int board_no; //게시물 번호
    private String category_cd; //카테고리 코드
    private String title; //제목
    private String writer_nm; //작성자명
    private int view_cnt; //조회수
    private String reg_dt; //작성일
    private boolean is_new; //new 여부
    private boolean is_file; //파일 갯수 여부
}
