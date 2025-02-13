package board.board_project.controller;

import board.board_project.service.BoardService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

@RestController
@RequestMapping("/board")
@Slf4j
public class BoardController {

    @Autowired
    BoardService boardService;

    ModelAndView mav = null;

    
    
}
