package board.board_project.controller.file;

import board.board_project.dto.request.file.DownloadFileDTO;
import board.board_project.dto.response.file.FileDataDTO;
import board.board_project.service.file.FileService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

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
    public ResponseEntity<List<FileDataDTO>> getFileData(@PathVariable("board_no") int board_no) {
        List<FileDataDTO> fileData = fileService.getFileData(board_no);

        return ResponseEntity.ok(fileData);
    }

    //파일 다운로드 -> 한글로 다운안되는거 나중에 체크
    @GetMapping("/download/{file_no}")
    public ResponseEntity<Resource> downloadFile(@PathVariable("file_no") int file_no) {
        //파일 정보 찾기
        DownloadFileDTO fileData = fileService.getDownloadFile(file_no);

        //파일 경로랑 객체 준비
        Path filePath = Paths.get(fileData.getSave_path());

        //다운로드할 파일을 가르키는 객체
        Resource resource = new FileSystemResource(filePath);

        if (!resource.exists()) {
            //파일이 존재하지 않는다면? 404 반환
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }

        String encodedFileName = URLEncoder.encode(fileData.getOrigin_file_nm(), StandardCharsets.UTF_8)
                .replaceAll("\\+", "%20");

        log.info("encodedFileName : {}", encodedFileName);
        log.info(("orginal : {}"), fileData.getOrigin_file_nm());

        //파일 응답 반환
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + encodedFileName + "\"")
                .contentType(MediaType.APPLICATION_OCTET_STREAM)
                .body(resource);
    }

    //다운로드수 증가
    @GetMapping("/downloadCnt/{file_no}")
    public void downloadFileCnt(@PathVariable("file_no") int file_no) {
        fileService.downloadFileCnt(file_no);
    }

    //파일 삭제
    @DeleteMapping("/delete")
    public ResponseEntity<Map<String, Object>> deleteFile(@RequestParam("save_path") String save_path,
                                                          @RequestParam("file_no") int file_no) {
        Map<String, Object> response = new HashMap<>();

        try {
            //파일 삭제
            fileService.deleteFile(save_path, file_no);

            response.put("success", true);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            response.put("success", false);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    //에디터 이미지 업로드
    @PostMapping("/imgUpload")
    public String imgUpload(@RequestPart("image") MultipartFile imgFile) {
        if (imgFile.isEmpty()) {
            return "파일이 없습니다.";
        }

        try {
            //파일 업로드 + 저장 경로 알아내기
            String imgUrl = fileService.editorImgUpload(imgFile);

            return imgUrl;
        } catch (Exception e) {
            return e.getMessage();
        }
    }
}
