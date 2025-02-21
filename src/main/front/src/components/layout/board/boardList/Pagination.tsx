import { useSearch } from "../../../../hooks/useSearch";

interface PaginationProps {
  totalPages: number;
}

export const Pagination = ({ totalPages }: PaginationProps) => {
  //사이즈 조건 변경시 search 상태 변경
  const { search, updatePage, updatePageSize } = useSearch();
  //현재 페이지
  const currentPage = search.page;

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
        className={`direction fir ${currentPage == 1 ? "disabled" : ""}`}
        onClick={() => handlePageChange(1)}
        style={{ pointerEvents: currentPage === 1 ? "none" : "auto" }}
      >
        처음
      </button>

      {/* 이전 페이지로 이동 */}
      <button
        className={`direction prev ${currentPage == 1 ? "disabled" : ""}`}
        onClick={() => handlePageChange(currentPage - 1)}
        style={{ pointerEvents: currentPage === 1 ? "none" : "auto" }}
      >
        이전
      </button>

      {/* 페이지 목록 */}
      {[...Array(totalPages)].map((_, i) => {
        const pageNum = i + 1;
        return pageNum == currentPage ? (
          <strong key={pageNum}>{pageNum}</strong>
        ) : (
          <button key={pageNum} onClick={() => handlePageChange(pageNum)}>
            {pageNum}
          </button>
        );
      })}

      {/* 다음 페이지로 이동 */}
      <button
        className={`direction next ${
          currentPage == totalPages ? "disabled" : ""
        }`}
        onClick={() => handlePageChange(currentPage + 1)}
        style={{ pointerEvents: currentPage === totalPages ? "none" : "auto" }}
      >
        다음
      </button>

      {/* 끝 페이지로 이동 */}
      <button
        className={`direction last ${
          currentPage == totalPages ? "disabled" : ""
        }`}
        onClick={() => handlePageChange(totalPages)}
        style={{ pointerEvents: currentPage === totalPages ? "none" : "auto" }}
      >
        끝끝
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
