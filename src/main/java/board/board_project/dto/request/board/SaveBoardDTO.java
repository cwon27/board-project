package board.board_project.dto.request.board;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SaveBoardDTO {
    private String category_cd; //카테고리 코드
    private String title; //제목
    private String cont; //내용
    private String writer_nm; //작성자명
    private String password; //비밀번호
}
