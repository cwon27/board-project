package board.board_project.dto.request.file;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SaveFileDTO {
    private String origin_file_nm; //원본파일명
    private String save_file_nm; //저장파일명 - UUID
    private String save_path; //저장경로
    private String ext; //확장자
    private long size; //파일 사이즈
    private int ref_pk; //참조pk - board_no
    private int ord; //파일 저장 순서
}
