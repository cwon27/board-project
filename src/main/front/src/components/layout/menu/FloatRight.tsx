import { Link } from "react-router-dom";

export const FloatRight = () => {
  return (
    <div className="float-right">
      <h2>QUICK MENU</h2>
      <ul>
        <li className="item1">
          <Link to="/board/list">통합게시판</Link>
        </li>
      </ul>
    </div>
  );
};
