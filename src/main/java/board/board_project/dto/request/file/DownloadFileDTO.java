package board.board_project.dto.request.file;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DownloadFileDTO {
    private String save_path; //저장경로
    private String origin_file_nm; //원본파일명
}
