import { Category } from "../Category";

export const Search = () => {
  return (
    <>
      <div className="hide-dv mt10">
        <table className="view">
          <colgroup>
            <col style={{ width: "150px" }} />
            <col />
          </colgroup>
          <tbody>
            <tr>
              <th>카테고리</th>
              <td>
                <Category/>
              </td>
            </tr>
            <tr>
              <th>검색어</th>
              <td>
                <select
                  className="select"
                  style={{ width: "150px", marginRight: "5px" }}
                >
                  <option>전체</option>
                  <option>-</option>
                </select>
                <input
                  type="text"
                  className="input"
                  style={{ width: "300px" }}
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="btn-box btm l">
        <a href="#" className="btn btn-red fr">
          검색
        </a>
      </div>

      <div className="tbl-hd noBrd mb0">
        <span className="total">
          검색 결과 : <strong>234</strong> 건
        </span>
        <div className="right">
          <span className="spanTitle">정렬 순서 :</span>
          <select className="select" style={{ width: "120px" }}>
            <option>최근 작성일</option>
            <option>조회수</option>
          </select>
        </div>
      </div>
    </>
  );
};
