package board.board_project.vo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CommcodeVO {
    private String grp_cd; //그룹코드
    private String comm_cd; //공통코드
    private String comm_cd_nm; //공통코드명
    private String comm_cd_val; //공통코드값
    private String add1; //추가1
    private String add2; //추가2
    private String add3; //추가3
    private int ord; //순서
    private String del_yn; //삭제여부
    private String reg_dt; //등록일시
}
