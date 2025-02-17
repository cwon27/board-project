package board.board_project.service.common;

import board.board_project.dto.response.common.CategoryDTO;
import board.board_project.mapper.board.BoardMapper;
import board.board_project.mapper.common.CommonMapper;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CommonService {
    private final CommonMapper commonMapper;

    public CommonService(CommonMapper commonMapper) {
        this.commonMapper = commonMapper;
    }

    //카테고리 값 GET
    public List<CategoryDTO> getCategoryData(String groupCode) {
        return commonMapper.getCategoryData(groupCode);
    }
}
