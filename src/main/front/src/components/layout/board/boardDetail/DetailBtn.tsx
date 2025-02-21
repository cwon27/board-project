import { Link } from "react-router-dom";
import { useSearch } from "../../../../hooks/useSearch";

interface DetailBtnProps {
  board_no:number;
}

export const DetailBtn = ({board_no}:DetailBtnProps) => {
  //팝업 띄우기
  const onPopup = (action:string) => {
    const url = "/board/pwCheck/"+board_no+"?action="+action;
    window.open(url,"_blank");
  }
  const { setBeforeSearch } = useSearch();
  return (
    <div className="btn-box r">
      <Link to="" className="btn btn-green" onClick={()=>onPopup("edit")}>
        수정
      </Link>
      <Link to={`/board/pwCheck/${board_no}?action=delete`} className="btn btn-red">
        삭제
      </Link>
      <Link to="/board/list" className="btn btn-default" onClick={setBeforeSearch}>
        목록
      </Link>
    </div>
  );
};
