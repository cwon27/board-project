import { useState } from "react";
import { FileItem } from "../../../../model/types";

interface FileInputProps {
  onChange: (newFiles: FileItem[]) => void;
}

export const FileInput = ({ onChange }: FileInputProps) => {
  //파일 상태 관리 -> 여기서만 사용하니까 state로 처리함
  const [files, setFiles] = useState<FileItem[]>([{ file: null }]);

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
      console.log(filteredFile);
      onChange(filteredFile);
    }
  };

  //파일 삭제
  const handleRemove = (i: number) => {
    //filter : 원본 배열을 변경하지 않고 새로운 배열을 만들어 반환 -> 상태 업데이트 가능
    //삭제할 일을 제외한 새로운 배열을 생성 -> 삭제 내역만 없어짐
    const newFiles = files.filter((_, index) => index !== i);

    if (newFiles.length < 3 && !newFiles.some((item) => item.file == null)) {
      newFiles.push({ file: null }); // 파일 객체만 추가
    }

    setFiles(newFiles);

    //file이 null값인 애들은 보내면 안됨
    const filteredFile = newFiles.filter(
      (filterItem) => filterItem.file !== null
    );
    console.log(filteredFile);
    onChange(filteredFile);
  };

  return (
    <>
      {files.map((fileItem, i) => (
        <tr key={i}>
          <th className="fir file-style">
            첨부파일 {i+1}
            {i == 0 && <i className="req">*</i>}
          </th>
          <td colSpan={3} className="file-style">
            {fileItem.file ? (
              <div className="file-display">
                <span style={{ fontSize: "15px" }}>{fileItem.file.name}</span>
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
