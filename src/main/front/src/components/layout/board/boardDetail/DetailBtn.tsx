import { Link } from "react-router-dom";
import { useSearch } from "../../../../hooks/useSearch";

interface DetailBtnProps {
  board_no:number;
}

export const DetailBtn = ({board_no}:DetailBtnProps) => {
  const { setBeforeSearch } = useSearch();
  return (
    <div className="btn-box r">
      <Link to={`/board/pwCheck/${board_no}?action=edit`} className="btn btn-green">
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
