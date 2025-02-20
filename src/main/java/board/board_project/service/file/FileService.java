package board.board_project.service.file;

import board.board_project.dto.request.file.SaveFileDTO;
import board.board_project.mapper.file.FileMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.util.List;
import java.util.UUID;

@Slf4j
@Service
public class FileService {
    //파일 저장 경로
    private final String upload = "E:/fileUploads/";

    //mapper
    private final FileMapper fileMapper;

    public FileService(FileMapper fileMapper) {
        this.fileMapper = fileMapper;
    }

    //파일 저장 -> 업로드파일에 저장도 하고 DB에 저장도 하고
    public void saveFiles(List<MultipartFile> fileItems, int board_no) {
        if (fileItems != null && !fileItems.isEmpty()) {
            for (int i = 0; i < fileItems.size(); i++) {
                saveFile(fileItems.get(i), board_no, i + 1); // 파일 순서는 1부터 시작하도록 설정
            }

        }
    }

    //파일 개별 저장 -> 업로드파일에 저장도 하고 DB에 저장도 하고
    public void saveFile(MultipartFile file, int board_no, int ord) {
        //원본파일명
        String orginalFileName = file.getOriginalFilename();
        //확장자
        String ext = orginalFileName.substring(orginalFileName.lastIndexOf(".") + 1);
        //파일 저장명 -> UUID
        String saveFileName = UUID.randomUUID().toString() + "." + ext;
        //파일 저장 경로
        String uploadPath = upload + saveFileName;
        //사이즈
        long size = file.getSize();
        try {
            //파일 저장
            File saveFile = new File(uploadPath);
            if (!saveFile.getParentFile().exists()) {
                //디렉토리가 없으면 생성
                saveFile.getParentFile().mkdir();
            }
            //파일 저장 실행
            file.transferTo(saveFile);

            //DB저장 위해 데이터 셋팅
            SaveFileDTO saveFileDTO = new SaveFileDTO(
                    orginalFileName, saveFileName, uploadPath, ext, size, board_no, ord);

            //DB 저장
            int result = fileMapper.saveFile(saveFileDTO);
            if (result <= 0) {
                throw new RuntimeException("파일 등록 실패");
            }
        } catch (Exception e) {
            throw new RuntimeException("파일 등록 실패", e);
        }
    }
}
