package board.board_project.mapper.common;

import board.board_project.dto.response.common.CategoryDTO;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.List;

@Mapper
@Repository
public interface CommonMapper {
    //카테고리 값 GET
    List<CategoryDTO> getCategoryData(String groupCode);
}
