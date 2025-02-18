import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { Category } from "../Category";
import { ToastEditor } from "./ToastEditor";
import { CategoryState } from "../../../../store/text.atom";
import { Link } from "react-router-dom";


interface FormProps {
  //통해서 등록인지 수정인지 구분분
  isUpdate: boolean;
}

export const Form = ({ isUpdate }: FormProps) => {
  //글 등록인 경우 카테고리값 기본값으로 초기화
  const [selectedCategory, setSelectedCategory] = useRecoilState(CategoryState);
  //취소를 누르면 검색 조건 유지
  const [beforeCategory,setBeforeCategory]=useState(selectedCategory);

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
            <input type="text" className="input block" />
          </td>
          <th className="fir">
            비밀번호 <i className="req">*</i>
          </th>
          <td>
            <input type="password" className="input block" />
          </td>
        </tr>
        <tr>
          <th className="fir">
            카테고리 <i className="req">*</i>
          </th>
          <td colSpan={3}>
            <Category/>
          </td>
        </tr>
        <tr>
          <th className="fir">
            제목 <i className="req">*</i>
          </th>
          <td colSpan={3}>
            <input type="text" className="input" style={{ width: "100%" }} />
          </td>
        </tr>
        <tr>
          <th className="fir">
            내용 <i className="req">*</i>
          </th>
          <td colSpan={3}>
            <ToastEditor />
          </td>
        </tr>
        <tr>
          <th className="fir">
            첨부파일 1 <i className="req">*</i>
          </th>
          <td colSpan={3}>
            <input type="file" className="input block mt10" />
          </td>
        </tr>
        <tr>
          <th className="fir">첨부파일 2</th>
          <td colSpan={3}>
            <input type="file" className="input block mt10" />
          </td>
        </tr>
        <tr>
          <th className="fir">첨부파일 3</th>
          <td colSpan={3}>
            <input type="file" className="input block mt10" />
          </td>
        </tr>
      </tbody>
    </table>
    <div className="btn-box r">
    <Link to="#" className="btn btn-red">
      저장
    </Link>
    <Link to="/board/list" className="btn btn-default" onClick={handleCancel}>
      취소
    </Link>
  </div>
  </>
  );
};
