import { useSearch } from "../../../../hooks/useSearch";

export const Pagination = () => {
  //사이즈 조건 변경시 search 상태 변경
  const { search, updatePage, updatePageSize } = useSearch();

  //사이즈 타입 선택 
  const handleSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const pageSize = parseInt(e.target.value);

    updatePageSize(pageSize);
  };

  //페이지 선택
  const handlePageChange = (page:number)=>{
    updatePage(page);
  }

  return (
    <div className="paginate_complex">
      <a href="#" className="direction fir">
        처음
      </a>
      <a href="#" className="direction prev">
        이전
      </a>
      <a href="#" onChange={()=>handlePageChange(1)}>1</a>
      <a href="#">2</a>
      <a href="#">3</a>
      <a href="#">4</a>
      <strong>5</strong>
      <a href="#">6</a>
      <a href="#">7</a>
      <a href="#">8</a>
      <a href="#">9</a>
      <a href="#">10</a>
      <a href="#" className="direction next">
        다음
      </a>
      <a href="#" className="direction last">
        끝
      </a>
      <div className="right">
        <select className="select" style={{ width: "120px" }} onChange={handleSizeChange}
            value={search.pageSize}>
          <option value={10}>10개씩보기</option>
          <option value={30}>30개씩보기</option>
          <option value={50}>50개씩보기</option>
        </select>
      </div>
    </div>
  );
};
