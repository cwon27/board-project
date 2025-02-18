import { Link } from "react-router-dom";

export const Menubar = () => {
  return (
    <div className="lm">
      <h2 className="h2-tit">
        <strong>커뮤니티</strong>
      </h2>
      <ul className="snb">
        <li className="snb1 active">
          <Link to="/board/list">통합게시판</Link>
        </li>
      </ul>
    </div>
  );
};
