import { Link } from "react-router-dom";
import { useSearch } from "../../../hooks/useSearch";

export const Menubar = () => {
  const { resetSearch } = useSearch();
  return (
    <div className="lm">
      <h2 className="h2-tit">
        <strong>커뮤니티</strong>
      </h2>
      <ul className="snb">
        <li className="snb1 active">
          <Link to="/list" onClick={resetSearch}>
            통합게시판
          </Link>
        </li>
      </ul>
    </div>
  );
};
