import { Link } from "react-router-dom"

export const Header = () => {
  return (
    <div className="header">
      <div className="div-utill"></div>
      <div className="head-inner">
        <h1 className="logo">
          <Link to="/board">초급자교육</Link>
        </h1>
        <div className="gnb-wrap">
          <ul className="gnb">
            <li className="gnb1">
              <Link to="/board/list" className="d1">
                커뮤니티
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
