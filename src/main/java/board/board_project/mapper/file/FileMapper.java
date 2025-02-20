package board.board_project.mapper.file;

import board.board_project.dto.request.file.SaveFileDTO;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

@Mapper
@Repository
public interface FileMapper {
    int saveFile(SaveFileDTO saveFileDTO);
}
