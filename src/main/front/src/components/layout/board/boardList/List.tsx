import { Link } from "react-router-dom";
import { useSearch } from "../../../../hooks/useSearch";
import { BoardList } from "../../../../model/types";

interface ListProps {
  listData:{
    boardList : BoardList[];
    totalListAmount:number;
  };
}

export const List = ({listData}:ListProps) => {
  //정렬조건 변경시 search 상태 변경
  const { search, updateSortType } = useSearch();

  //정렬 타입 선택 
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const sortType = e.target.value;

    updateSortType(sortType);
  };

  return (
    <>
      <div className="tbl-hd noBrd mb0">
        <span className="total">
          검색 결과 : <strong>{listData.totalListAmount}</strong> 건
        </span>
        <div className="right">
          <span className="spanTitle">정렬 순서 :</span>
          <select
            className="select"
            style={{ width: "120px" }}
            onChange={handleSortChange}
            value={search.sortType}
          >
            <option value={"latest"}>최근 작성일</option>
            <option value={"hit"}>조회수</option>
          </select>
        </div>
      </div>
      <table className="list default">
        <colgroup>
          <col style={{ width: "60px" }} />
          <col style={{ width: "80px" }} />
          <col />
          <col style={{ width: "80px" }} />
          <col style={{ width: "80px" }} />
          <col style={{ width: "80px" }} />
          <col style={{ width: "120px" }} />
        </colgroup>
        <thead>
          <tr>
            <th>No</th>
            <th>카테고리</th>
            <th>제목</th>
            <th>첨부파일</th>
            <th>작성자</th>
            <th>조회수</th>
            <th>작성일</th>
          </tr>
        </thead>
        <tbody>
          {listData.boardList && listData.boardList.map((board)=>{
             return (
            <tr key={board.board_no}>
            <td>{board.board_no}</td>
            <td>{board.category_cd}</td>
            <td className="l">
              <Link to={`/board/detail/${board.board_no}`}>
              {board.title}
                {board._new && <img src="/src/images/new.gif" className="new" />}
              </Link>
            </td>
            <td>
            {board._file && (
                  <Link to={`/board/detail/${board.board_no}`} className="ic-file">파일</Link>
                )}
            </td>
            <td>{board.writer_nm}</td>
            <td>{board.view_cnt}</td>
            <td>{board.reg_dt}</td>
          </tr>
          );
          })}
        </tbody>
      </table>
    </>
  );
};
