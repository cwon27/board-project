package board.board_project.mapper.file;

import board.board_project.dto.request.file.DownloadFileDTO;
import board.board_project.dto.request.file.SaveFileDTO;
import board.board_project.dto.response.file.FileDataDTO;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.List;

@Mapper
@Repository
public interface FileMapper {
    //파일 DB 저장
    int saveFile(SaveFileDTO saveFileDTO);

    //파일 데이터 GET
    List<FileDataDTO> getFileData(int board_no);

    //파일 다운로드
    DownloadFileDTO getDownloadFile(int file_no);

    //파일 다운로드수 증가
    void downloadFileCnt(int file_no);

    //파일 삭제
    int deleteFile(int fileNo);
}
