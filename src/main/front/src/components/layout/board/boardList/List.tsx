import { Link } from "react-router-dom";

export const List = () => {
  return (
    <table className="list default">
      <colgroup>
        <col style={{width: "60px"}} />
        <col style={{width: "80px"}} />
        <col />
        <col style={{width: "80px"}} />
        <col style={{width: "80px"}} />
        <col style={{width: "80px"}} />
        <col style={{width: "120px"}} />
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
        <tr>
          <td>100</td>
          <td>공지</td>
          <td className="l">
            <Link to="/board/detail/1">
              [롯데백화점] 2024년 5월분 세금계산서 접수기간 안내
              <img src="/src/images/new.gif" className="new" />
            </Link>
          </td>
          <td>
            <a href="#" className="ic-file">
              파일
            </a>
          </td>
          <td>관리자</td>
          <td>77</td>
          <td>2024-05-29</td>
        </tr>
        <tr>
          <td>100</td>
          <td>공지</td>
          <td className="l">
            <a href="#">[롯데백화점] 2024년 5월분 세금계산서 접수기간 안내</a>
          </td>
          <td>
            <a href="#" className="ic-file">
              파일
            </a>
          </td>
          <td>관리자</td>
          <td>77</td>
          <td>2024-05-29</td>
        </tr>
        <tr>
          <td>100</td>
          <td>공지</td>
          <td className="l">
            <a href="#">[롯데백화점] 2024년 5월분 세금계산서 접수기간 안내</a>
          </td>
          <td></td>
          <td>관리자</td>
          <td>77</td>
          <td>2024-05-29</td>
        </tr>
        <tr>
          <td>100</td>
          <td>공지</td>
          <td className="l">
            <a href="#">
              [롯데백화점] 2024년 5월분 세금계산서 접수기간 안내
              <img src="/src/images/new.gif" className="new" />
            </a>
          </td>
          <td>
            <a href="#" className="ic-file">
              파일
            </a>
          </td>
          <td>관리자</td>
          <td>77</td>
          <td>2024-05-29</td>
        </tr>
        <tr>
          <td>100</td>
          <td>공지</td>
          <td className="l">
            <a href="#">[롯데백화점] 2024년 5월분 세금계산서 접수기간 안내</a>
          </td>
          <td>
            <a href="#" className="ic-file">
              파일
            </a>
          </td>
          <td>관리자</td>
          <td>77</td>
          <td>2024-05-29</td>
        </tr>
      </tbody>
    </table>
  );
};
