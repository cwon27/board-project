package board.board_project.dto.response.file;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class FileDataDTO {
    private int file_no;
    private String origin_file_nm;
    private int ord;
    private String save_path;
}
