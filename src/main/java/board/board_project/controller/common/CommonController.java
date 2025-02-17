package board.board_project.controller.common;

import board.board_project.dto.response.common.CategoryDTO;
import board.board_project.service.board.BoardService;
import board.board_project.service.common.CommonService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/common")
public class CommonController {
    private final CommonService commonService;

    public CommonController(CommonService commonService) {
        this.commonService = commonService;
    }

    //카테고리 값 뿌려주는 api -> 카테고리에 해당하는 코드만 나와야함
    @GetMapping("/category")
    public ResponseEntity<Map<String, Object>> getCategoryData() {
        //공통코드 : 공통코드명
        //공통코드 테이블에서 데이터 가져오기\
        String groupCode = "CTG";
        List<CategoryDTO> categoryData = commonService.getCategoryData(groupCode);

        Map<String, Object> response = new HashMap<>();
        response.put("categoryData", categoryData);

        return ResponseEntity.ok(response);
    }
}
