import { useEffect, useState } from "react";
import { FileData, FileItem } from "../../../../model/types";
import { handleDownload } from "../../../../utils/boardUtil";
import { useDeleteFile } from "../../../../hooks/useMutation";

interface FileInputProps {
  onChange: (newFiles: FileItem[]) => void;
  existingFiles: FileData[];
  isUpdate: boolean;
}

export const FileInput = ({
  onChange,
  existingFiles,
  isUpdate,
}: FileInputProps) => {
  //파일 상태 관리
  const [files, setFiles] = useState<FileItem[]>([{ file: null }]);

  useEffect(() => {
    // 기존 파일 데이터가 있으면 초기화
    if (existingFiles && existingFiles.length > 0) {
      let newFiles = [...files];
      newFiles = existingFiles.map((fileData) => ({
        file: new File([], ""),
        fileData, // 기존 파일 정보
      }));

      //input 나오게
      if (newFiles.length < 3) {
        newFiles.push({ file: null });
      }

      setFiles(newFiles);
    }
  }, [existingFiles]);

  //파일 선택
  const handleFileChange = (
    i: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    //file이 선택되면?
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = [...files]; //기존 파일 목록 복사
      newFiles[i].file = e.target.files[0]; //선택 파일 저장 -> 해당 index 위치에 저장

      //최대 3개까지 추가 가능함 + 파일이 2개가 채워져있는 경우(null X)
      if (newFiles.length < 3 && !newFiles.some((item) => item.file == null)) {
        newFiles.push({ file: null }); // 파일 객체만 추가
      }

      setFiles(newFiles);

      //file이 null값인 애들은 보내면 안됨
      const filteredFile = newFiles.filter(
        (filterItem) => filterItem.file !== null
      );
      onChange(filteredFile);
    }
  };

  //파일 삭제 요청 Mutation
  const { mutate: deleteFileMutation } = useDeleteFile();

  //파일 삭제
  const handleRemove = (i: number) => {
    const fileToDelete = files[i];

    // 기존 파일인지 확인
    if (fileToDelete.fileData) {
      const confirmDelete = window.confirm(
        "정말 파일을 삭제하시겠습니까?(수정을 완료하지 않아도 파일이 삭제됩니다!)"
      );
      if (!confirmDelete) return;

      // 파일 삭제 요청
      deleteFileMutation(
        {
          save_path: fileToDelete.fileData.save_path,
          file_no: fileToDelete.fileData.file_no,
        },
        {
          onSuccess: () => {
            alert("파일이 삭제되었습니다.");
            updateFileList(i); // 삭제 후 리스트 업데이트
          },
          onError: () => {
            alert("파일 삭제에 실패했습니다.");
          },
        }
      );
    } else {
      // 새로 추가된 파일이라면 그냥 목록에서 제거
      updateFileList(i);
    }
  };

  //파일 목록 업데이트
  const updateFileList = (i: number) => {
    let newFiles = [...files];

    if (isUpdate) {
      // 수정시 input 위치 변경 X -> 삭제한 위치에 { file: null } 유지
      newFiles[i] = { file: null };
    } else {
      // 등록시 input 위치 변경 O -> 삭제한 항목 제외 한개씩 위로 땡기기
      //filter : 원본 배열을 변경하지 않고 새로운 배열을 만들어 반환 -> 상태 업데이트 가능
      //삭제할 일을 제외한 새로운 배열을 생성 -> 삭제 내역만 없어짐
      newFiles = files.filter((_, index) => index !== i);
    }

    if (newFiles.length < 3 && !newFiles.some((item) => item.file == null)) {
      newFiles.push({ file: null }); // 파일 객체만 추가
    }

    setFiles(newFiles);

    //file이 null값인 애들은 보내면 안됨
    const filteredFile = newFiles.filter(
      (filterItem) => filterItem.file !== null
    );

    onChange(filteredFile);
  };

  return (
    <>
      {files.map((fileItem, i) => (
        <tr key={i}>
          <th className="fir file-style">
            첨부파일 {i + 1}
            {i == 0 && <i className="req">*</i>}
          </th>
          <td colSpan={3} className="file-style">
            {fileItem.file ? (
              <div className="file-display">
                {/* fileItem.fileData가 있으면 다운로드 버튼 표시 */}
                {fileItem.fileData &&
                  fileItem.fileData.file_no !== undefined && (
                    <button
                      className="ic-file2 fileBtn"
                      onClick={() => handleDownload(fileItem.fileData?.file_no)}
                    ></button>
                  )}
                <span style={{ fontSize: "15px" }}>
                  {fileItem.file.name || fileItem.fileData?.origin_file_nm}
                </span>
                <button
                  className="file-del-btn"
                  onClick={() => handleRemove(i)}
                >
                  X
                </button>
              </div>
            ) : (
              <>
                <input
                  type="file"
                  id={`file-${i}`}
                  style={{ display: "none" }}
                  onChange={(e) => handleFileChange(i, e)}
                />
                <label htmlFor={`file-${i}`} className="file-label">
                  파일 선택
                </label>
              </>
            )}
          </td>
        </tr>
      ))}
    </>
  );
};
