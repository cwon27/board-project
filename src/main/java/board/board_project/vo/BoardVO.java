package board.board_project.vo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BoardVO {
    private int board_no; //게시물 번호
    private String category_cd; //카테고리 코드
    private String title; //제목
    private String cont; //내용
    private String writer_nm; //작성자명
    private String password; //비밀번호
    private int view_cnt; //조회수
    private String reg_dt; //작성일
    private String mod_dt; //수정일
}
