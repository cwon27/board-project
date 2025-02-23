import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Category } from "../Category";
import { ToastEditor } from "./ToastEditor";
import { BoardData, BoardDetail, FileData, FileItem } from "../../../../model/types";
import { useMutation } from "@tanstack/react-query";
import { saveBoard, updateBoard } from "../../../../apis/service";
import { FileInput } from "./FileInput";
import { useSearch } from "../../../../hooks/useSearch";

interface FormProps {
  //통해서 등록인지 수정인지 구분
  isUpdate: boolean;
  initialData?: {
    boardDetail:BoardDetail,
    fileData : FileData
  }
}

export const Form = ({ isUpdate, initialData }: FormProps) => {
  const { search, setSearch, resetSearch, setBeforeSearch } = useSearch();

  //글등록인 경우 카테고리 전체로 초기화
  useEffect(() => {
    if (!isUpdate && formData.category_cd == "ALL") {
      setSearch((prev) => ({
        ...prev,
        searchCategoryType: {
          comm_cd: "ALL",
          comm_cd_nm: "전체",
        },
      }));
    }
  }, [isUpdate, setSearch]);

  //** 글 등록
  //데이터 상태 관리
  const [formData, setFormData] = useState<BoardData>({
    category_cd: initialData?.boardDetail.category_cd || "ALL",
    title: initialData?.boardDetail.title || "",
    cont: initialData?.boardDetail.cont || "",
    writer_nm: initialData?.boardDetail.writer_nm || "",
    password: "",
  });

  console.log(formData.category_cd);

  //데이터 변경 함수
  const handleDataChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  //카테고리 데이터 변경된 걸 setFormData에 update -> search.searchCategoryType 값이 변할때마다 실행
  useEffect(() => {
    if (isUpdate && formData.category_cd != "ALL" && search.searchCategoryType.comm_cd != "ALL") {
    setFormData((prev) => ({
      ...prev,
      category_cd: search.searchCategoryType.comm_cd,
    }));
  }
  }, [search.searchCategoryType]);

  //toast-ui에 있는 값
  const handleEditorChange = (cont: string) => {
    setFormData((prev) => ({
      ...prev,
      cont: cont,
    }));
  };

  const navigator = useNavigate();

  //react-query useMutation 사용하여 api함수 호출
  //파일값 상태 관리
  //새로운 파일
  const [files, setFiles] = useState<FileItem[]>([]);
//기존 파일
const [existingFiles, setExistingFiles] = useState<FileData[]>([]);

  useEffect(() => {
    if (isUpdate && initialData) {
      setFormData({
        category_cd: initialData.boardDetail.category_cd,
        title: initialData.boardDetail.title,
        cont: initialData.boardDetail.cont,
        writer_nm: initialData.boardDetail.writer_nm,
        password: "",
      });

      setExistingFiles(Array.isArray(initialData.fileData) ? initialData.fileData : [initialData.fileData]);
    }
  }, [isUpdate, initialData]);

  console.log(existingFiles);

  //파일 변경
  const handleFileChange = (newFiles: FileItem[]) => {
    setFiles(newFiles);
  };

  //글, 파일 저장(트랜잭션 위해)
  const mutation = useMutation({
    mutationFn: async (formdata: BoardData) => {
      // null이 아닌 실제 File 객체만 추출
      const filterdFile = files
        .map((item) => item.file)
        .filter((file): file is File => file !== null);

        if (isUpdate) {
          if (!initialData?.boardDetail.board_no) {
            throw new Error('게시글 번호가 없습니다.');
          }
          return updateBoard(initialData.boardDetail.board_no, formdata);
        }
        return saveBoard(formdata,filterdFile);
    },
    onSuccess: (response) => {
      if (response.success) {
        alert(isUpdate ? "수정되었습니다." : "저장되었습니다.");
        //검색 조건 초기화
        resetSearch();
        //목록으로 이동
        navigator("/board/list");
      } else {
        alert(isUpdate ? "수정을 실패했습니다." : "저장을 실패했습니다.");
      }
    },
    onError: (error) => {
      alert("저장을 실패했습니다." + error.message);
    },
  });

  //저장 버튼 눌렀을 때 함수
  const handleSubmit = () => {
    //유효성 검사 추가
    //1. 작성자
    if (!isUpdate && (!formData.writer_nm.trim() || formData.writer_nm.length > 50)) {
      alert("작성자를 다시 입력해주세요! (필수로 입력, 50자 이내)");
      return;
    }
    //2. 비밀번호
    if (!isUpdate && (!formData.password.trim() || formData.password.length > 100)) {
      alert("비밀번호를 다시 입력해주세요! (필수로 입력, 100자 이내)");
      return;
    }
    //3. 카테고리
    if (formData.category_cd == "ALL") {
      alert("카테고리 타입을 선택하세요!");
      return;
    }
    //4. 제목
    if (!formData.title.trim() || formData.title.length > 200) {
      alert("제목을 다시 입력해주세요! (필수로 입력, 200자 이내)");
      return;
    }
    //5. 내용
    if (!formData.cont.trim()) {
      alert("내용을 입력해주세요! (필수로 입력)");
      return;
    }
    //6.첨부파일 1개 이상
    if (!files[0]?.file) {
      alert("파일은 1개 이상 선택해주세요!");
      return;
    }

    mutation.mutate(formData);
  };

  return (
    <>
      <table className="write">
        <colgroup>
          <col style={{ width: "150px" }} />
          <col />
          <col style={{ width: "150px" }} />
          <col />
        </colgroup>
        <tbody>
          <tr>
            <th className="fir">
              작성자 <i className="req">*</i>
            </th>
            <td>
              <input
                type="text"
                className="input block"
                name="writer_nm"
                onChange={handleDataChange}
                value={formData.writer_nm}
                readOnly={isUpdate}
              />
            </td>
            <th className="fir">
              비밀번호 <i className="req">*</i>
            </th>
            <td>
              <input
                type="password"
                className="input block"
                name="password"
                onChange={handleDataChange}
                value={isUpdate ? "*******" : formData.password}
                readOnly={isUpdate}
              />
            </td>
          </tr>
          <tr>
            <th className="fir">
              카테고리 <i className="req">*</i>
            </th>
            <td colSpan={3}>
              <Category isUpdate={isUpdate} initialValue={isUpdate ? formData.category_cd : " "}/>
            </td>
          </tr>
          <tr>
            <th className="fir">
              제목 <i className="req">*</i>
            </th>
            <td colSpan={3}>
              <input
                type="text"
                className="input"
                style={{ width: "100%" }}
                name="title"
                onChange={handleDataChange}
                value={formData.title}
              />
            </td>
          </tr>
          <tr>
            <th className="fir">
              내용 <i className="req">*</i>
            </th>
            <td colSpan={3}>
              <ToastEditor
                onChange={handleEditorChange}
                initialValue={isUpdate ? formData.cont : " "}
              />
            </td>
          </tr>
          <FileInput onChange={handleFileChange} existingFiles={existingFiles}/>
        </tbody>
      </table>
      <div className="btn-box r">
        <Link to="#" className="btn btn-red" onClick={handleSubmit}>
          저장
        </Link>
        <Link
          to="/board/list"
          className="btn btn-default"
          onClick={setBeforeSearch}
        >
          취소
        </Link>
      </div>
    </>
  );
};
