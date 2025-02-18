import { Link } from "react-router-dom";
import { List } from "../../components/layout/board/boardList/List";
import { Pagination } from "../../components/layout/board/boardList/Pagination";
import { Search } from "../../components/layout/board/boardList/Search";

export const BoardList = () => {
  return (
    <>
      <Search />
      <List />
      <Pagination />
      <div className="btn-box l mt30">
        <Link to="/board/write" className="btn btn-green fr">
          등록
        </Link>
      </div>
    </>
  );
};
