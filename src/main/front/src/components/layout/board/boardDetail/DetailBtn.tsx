import { Link } from "react-router-dom";

export const DetailBtn = () => {
  return (
    <div className="btn-box r">
      <Link to="/board/pwCheck" className="btn btn-green">
        수정
      </Link>
      <Link to="/board/pwCheck" className="btn btn-red">
        삭제
      </Link>
      <Link to="/board/list" className="btn btn-default">
        목록
      </Link>
    </div>
  );
};
