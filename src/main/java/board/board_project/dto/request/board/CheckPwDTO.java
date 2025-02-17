package board.board_project.dto.request.board;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CheckPwDTO {
    private int board_no; //게시물 번호
    private String password; //비밀번호
}
