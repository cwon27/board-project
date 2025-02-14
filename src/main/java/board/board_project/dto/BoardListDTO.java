package board.board_project.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

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
}
