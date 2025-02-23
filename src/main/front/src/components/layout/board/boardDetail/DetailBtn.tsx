import { Link } from "react-router-dom";
import { useSearch } from "../../../../hooks/useSearch";

interface DetailBtnProps {
  board_no:number;
}

export const DetailBtn = ({board_no}:DetailBtnProps) => {
  //팝업 띄우기
  const onPopup = (action:string) => {
    const url = "/board/pwCheck/"+board_no+"?action="+action;
    window.open(url,"_blank","width=500px, height=300px, left=600px, top=300px");
  }
  
  const { setBeforeSearch } = useSearch();
  return (
    <div className="btn-box r">
      <button className="btn btn-green" onClick={()=>onPopup("edit")}>
        수정
      </button>
      <button className="btn btn-red" onClick={()=>onPopup("delete")}>
        삭제
      </button>
      <Link to="/board/list" className="btn btn-default" onClick={setBeforeSearch}>
        목록
      </Link>
    </div>
  );
};
