import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { Category } from "../Category";
import { ToastEditor } from "./ToastEditor";
import { CategoryState } from "../../../../store/text.atom";
import { BoardData, FileItem } from "../../../../model/types";
import { useMutation } from "@tanstack/react-query";
import { saveBoard } from "../../../../apis/service";
import { FileInput } from "./FileInput";

interface FormProps {
  //통해서 등록인지 수정인지 구분
  isUpdate: boolean;
}

export const Form = ({ isUpdate }: FormProps) => {
  //** 카테고리 값 초기화
  //글 등록인 경우 카테고리값 기본값으로 초기화
  const [selectedCategory, setSelectedCategory] = useRecoilState(CategoryState);
  //취소를 누르면 검색 조건 유지
  const [beforeCategory, setBeforeCategory] = useState(selectedCategory);

  useEffect(() => {
    if (!isUpdate) {
      setSelectedCategory({
        comm_cd: "ALL",
        comm_cd_nm: "전체",
      });
    }
  }, [isUpdate, setSelectedCategory]);

  const handleCancel = () => {
    setSelectedCategory(beforeCategory);
  };

  //** 글 등록
  //데이터 상태 관리
  const [formData, setFormData] = useState<BoardData>({
    category_cd: "ALL",
    title: "",
    cont: "",
    writer_nm: "",
    password: "",
  });

  //데이터 변경 함수
  const handleDataChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  //카테고리 데이터 변경된 걸 setFormData에 update -> selectedCategory 값이 변할때마다 실행
  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      category_cd: selectedCategory.comm_cd,
    }));
  }, [selectedCategory]);

  //toast-ui에 있는 값
  const handleEditorChange = (cont: string) => {
    setFormData((prev) => ({
      ...prev,
      cont: cont,
    }));
  };

  const navigator = useNavigate();

  //react-query useMutation 사용하여 api함수 호출
  //파일값 상태 관리리
  const [files, setFiles] = useState<FileItem[]>([]);
  const handleFileChange = (newFiles: FileItem[]) => {
    setFiles(newFiles);
  };

  //글, 파일 저장(트랜잭션 위해)
  const mutation = useMutation({
    mutationFn: (formdata: BoardData) => {
      // null이 아닌 실제 File 객체만 추출
      const filterdFile = files
        .map(item => item.file)
        .filter((file): file is File => file !== null);

        console.log(filterdFile.length);
      
      return saveBoard(formdata, filterdFile);
    },
    onSuccess: (response) => {
      if (response.success) {
        alert("저장을 성공하였습니다.");
        //검색 조건 초기화
        
        navigator("/board/list");
      } else {
        alert("저장을 실패했습니다.");
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
    if (!formData.writer_nm.trim() || formData.writer_nm.length > 50) {
      alert("작성자를 다시 입력해주세요! (필수로 입력, 50자 이내)");
      return;
    }
    //2. 비밀번호
    if (!formData.password.trim() || formData.password.length > 100) {
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
    if(!files[0]?.file){
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
                value={formData.password}
              />
            </td>
          </tr>
          <tr>
            <th className="fir">
              카테고리 <i className="req">*</i>
            </th>
            <td colSpan={3}>
              <Category />
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
          <FileInput onChange={handleFileChange} />
        </tbody>
      </table>
      <div className="btn-box r">
        <Link to="#" className="btn btn-red" onClick={handleSubmit}>
          저장
        </Link>
        <Link
          to="/board/list"
          className="btn btn-default"
          onClick={handleCancel}
        >
          취소
        </Link>
      </div>
    </>
  );
};
