package board.board_project.controller.file;

import board.board_project.dto.request.file.DownloadFileDTO;
import board.board_project.dto.response.file.FileDataDTO;
import board.board_project.service.file.FileService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.core.io.support.ResourceRegion;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;


@Slf4j
@RestController
@RequestMapping("/api/file")
public class FileController {
    private final FileService fileService;

    public FileController(FileService fileService) {
        this.fileService = fileService;
    }

    //파일 데이터 뿌려주기 -> 필요데이터 : 파일번호, 원본파일명
    @GetMapping("/data/{board_no}")
    public ResponseEntity<List<FileDataDTO>> getFileData(@PathVariable("board_no") int board_no){
        List<FileDataDTO> fileData = fileService.getFileData(board_no);

        return ResponseEntity.ok(fileData);
    }

    //파일 다운로드
    @GetMapping("/download/{file_no}")
    public ResponseEntity<Resource> downloadFile(@PathVariable("file_no") int file_no){
        //파일 정보 찾기
        DownloadFileDTO fileData = fileService.getDownloadFile(file_no);

        //파일 경로랑 객체 준비
        Path filePath = Paths.get(fileData.getSave_path());
        //다운로드할 파일을 가르키는 객체
        Resource resource = new FileSystemResource(filePath);

        if (!resource.exists()){
            //파일이 존재하지 않는다면? 404 반환
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }

        //파일 응답 반환
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + fileData.getOrigin_file_nm() + "\"")
                .contentType(MediaType.APPLICATION_OCTET_STREAM)
                .body(resource);
    }

    //다운로드수 증가
    @GetMapping("/downloadCnt/{file_no}")
    public void downloadFileCnt(@PathVariable("file_no") int file_no){
        fileService.downloadFileCnt(file_no);
    }

    //파일 업데이트
}
