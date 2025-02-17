package board.board_project.dto.request.board;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SearchBoardDTO {
    private String searchCategoryType;
    private String searchType;
    private String searchKeyword;
    private String sortType;
    private  int page;
    private int pageSize;
    private int offset;

    public void calculateOffset() {
        this.offset = (this.page - 1) * this.pageSize;
    }
}
