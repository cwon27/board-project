import { useSearch } from "../../../../hooks/useSearch";

interface PaginationProps {
  totalPages: number;
}

export const Pagination = ({ totalPages }: PaginationProps) => {
  //사이즈 조건 변경시 search 상태 변경
  const { search, updatePage, updatePageSize } = useSearch();
  //현재 페이지
  const currentPage = search.page;

  //페이지 갯수 정하기 -> 1~10, 11~20
  const startPage = Math.floor((currentPage-1)/10)*10+1;
  //최대 10개까지 표시 -> startPage+9 -> 해당 페이지 마지막 번호호
  const endPage = Math.min(startPage+9, totalPages); 

  //사이즈 타입 선택
  const handleSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const pageSize = parseInt(e.target.value);

    updatePageSize(pageSize);
  };

  //페이지 선택
  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      updatePage(newPage);
    }
  };

  return (
    <div className="paginate_complex">
      {/* 첫페이지로 이동 */}
      <button
        className="direction fir"
        onClick={() => handlePageChange(1)}
        style={{ pointerEvents: currentPage === 1 ? "none" : "auto" }}
      >
        처음
      </button>

      {/* 이전 페이지 리스트 이동(11~20 -> 1~10) */}
      <button
        className={"direction prev"}
        onClick={() => handlePageChange(startPage  - 1)}
        style={{ pointerEvents: startPage  === 1 ? "none" : "auto" }}
      >
        이전
      </button>

      {/* 페이지 목록 */}
      {[...Array(endPage - startPage + 1)].map((_, i) => {
        const pageNum = startPage  + i;
        return pageNum == currentPage ? (
          <strong key={pageNum}>{pageNum}</strong>
        ) : (
          <button key={pageNum} onClick={() => handlePageChange(pageNum)}>
            {pageNum}
          </button>
        );
      })}

      {/* 다음 페이지 리스트 이동(1~10 -> 11~20) */}
      <button
        className={"direction next"}
        onClick={() => handlePageChange(endPage + 1)}
        style={{ pointerEvents: endPage === totalPages ? "none" : "auto" }}
      >
        다음
      </button>

      {/* 끝 페이지로 이동 */}
      <button
        className={"direction last"}
        onClick={() => handlePageChange(totalPages)}
        style={{ pointerEvents: currentPage === totalPages ? "none" : "auto" }}
      >
        끝
      </button>

      <div className="right">
        <select
          className="select"
          style={{ width: "120px" }}
          onChange={handleSizeChange}
          value={search.pageSize}
        >
          <option value={10}>10개씩보기</option>
          <option value={30}>30개씩보기</option>
          <option value={50}>50개씩보기</option>
        </select>
      </div>
    </div>
  );
};
