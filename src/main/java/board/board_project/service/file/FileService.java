package board.board_project.service.file;

import board.board_project.dto.request.file.DownloadFileDTO;
import board.board_project.dto.request.file.SaveFileDTO;
import board.board_project.dto.response.file.FileDataDTO;
import board.board_project.mapper.file.FileMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
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

    //파일 데이터 GET
    public List<FileDataDTO> getFileData(int board_no){
        return fileMapper.getFileData(board_no);
    }

    //파일 다운로드
    public DownloadFileDTO getDownloadFile(int file_no){
        return fileMapper.getDownloadFile(file_no);
    }

    //파일 다운로드수 증가
    public void downloadFileCnt(int file_no){
        fileMapper.downloadFileCnt(file_no);
    }

    //파일 삭제(모두 -> 삭제버튼 누른 경우)
    public void deleteFileAll(int board_no){
        log.info("파일 삭제 요청: board_no = {}", board_no);//잘 오는데...

        List<FileDataDTO> files = getFileData(board_no);

        log.info(files.toString());

        if(files==null || files.isEmpty()){
            log.warn("삭제할 파일이 없음: board_no = {}", board_no);

            throw new RuntimeException("삭제할 파일이 없습니다.");
        }

        for(FileDataDTO file : files){
            String filePath = file.getSave_path();

            log.info("파일 삭제 시도: filePath = {}", filePath);

            if(filePath != null && !filePath.isEmpty()){
                //파일 삭제하기
                deleteFile(filePath);
            }else{
                throw new RuntimeException("파일 경로가 유효하지 않습니다.");
            }
        }
    }

    //파일 삭제(개별)
    public void deleteFile(String filePath){
        Path path = Paths.get(filePath);
        log.info("파일 존재 여부 확인: {}", filePath);


        if(Files.exists(path)){
            try {
                //파일 삭제
                Files.delete(path);
                //DB에서도 삭제
                int result = fileMapper.deleteFile(filePath);

                if(result<=0){
                    throw new RuntimeException("파일 삭제를 실패했습니다.(DB 삭제 실패)");
                }
                log.info("파일 삭제를 성공했습니다.");
            } catch (Exception e) {
                throw new RuntimeException("파일 삭제를 실패했습니다.",e);
            }
        }else{
            throw new RuntimeException("삭제할 파일이 없습니다.");
        }
    }
}
