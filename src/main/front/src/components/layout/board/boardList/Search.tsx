import { Link } from "react-router-dom";
import { Category } from "../Category";
import { useSearch } from "../../../../hooks/useSearch";

interface SearchProps {
  onSearch: ()=>void;
}

export const Search = ({onSearch}:SearchProps) => {
  //검색조건 변경시 search 상태 변경
  const { search, updateSearchType, updateSearchKeyword } = useSearch();

  //검색 타입 선택
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const searchType = e.target.value;

    updateSearchType(searchType);
  };

  //검색 키워드 입력
  const handleKeywordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchKeyword = e.target.value;

    updateSearchKeyword(searchKeyword);
  };

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
                <Category />
              </td>
            </tr>
            <tr>
              <th>검색어</th>
              <td>
                <select
                  className="select"
                  style={{ width: "150px", marginRight: "5px" }}
                  onChange={handleSelectChange}
                  value={search.searchType}
                >
                  <option value={"all"}>전체</option>
                  <option value={"title"}>제목</option>
                  <option value={"cont"}>내용</option>
                  <option value={"titleCont"}>제목+내용</option>
                  <option value={"writer"}>작성자명</option>
                </select>
                <input
                  type="text"
                  className="input"
                  style={{ width: "300px" }}
                  onChange={handleKeywordChange}
                  value={search.searchKeyword}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      onSearch();
                    }
                  }}
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="btn-box btm l">
        <Link to="#" className="btn btn-red fr" onClick={onSearch}>
          검색
        </Link>
      </div>
    </>
  );
};
