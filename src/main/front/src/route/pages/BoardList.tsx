import { Link } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { List } from "../../components/layout/board/boardList/List";
import { Pagination } from "../../components/layout/board/boardList/Pagination";
import { Search } from "../../components/layout/board/boardList/Search";
import { useSearch } from "../../hooks/useSearch";
import { useBoardList } from "../../hooks/useQuery";

export const BoardList = () => {
  //List는 부모컴포넌트에서 구현
  //이유는 각 컴포넌트들이 연관성이 많아서 데이터 흐름 보려면 여기가 나을듯

  //검색 조건 상태
  const { search, updatePage } = useSearch();

  const queryClient = useQueryClient();

  //검색 조건으로 list 가져오기
  const { data, isLoading, error } = useBoardList(search);

  // 검색 실행 함수
  const handleChange = () => {
    //검색시 항상 page=1로 변경해야함
    updatePage(1);
    //실행
    queryClient.invalidateQueries({ queryKey: ["boardList"] });
  };

  if (isLoading) return <p>로딩중....</p>;
  if (error) return <p>리스트 값 가져오는데 에러남</p>;

  return (
    <>
      <Search onSearch={handleChange} />
      <List listData={data} />
      <Pagination totalPages={data?.totalPages || 0} />
      <div className="btn-box l mt30">
        <Link to="/write" className="btn btn-green fr">
          등록
        </Link>
      </div>
    </>
  );
};
