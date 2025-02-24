import { Link } from "react-router-dom";
import { useSearch } from "../../../hooks/useSearch";

export const FloatRight = () => {
  const { resetSearch } = useSearch();
  return (
    <div className="float-right">
      <h2>QUICK MENU</h2>
      <ul>
        <li className="item1">
          <Link to="/list" onClick={resetSearch}>
            통합게시판
          </Link>
        </li>
      </ul>
    </div>
  );
};
