import { useRecoilState, useResetRecoilState } from "recoil";
import { SearchState } from "../store/text.atom";
import { useEffect, useRef } from "react";

export const useSearch = () => {
  //상태관리
  const [search, setSearch] = useRecoilState(SearchState);

  //검색조건 초기화
  const resetSearch = useResetRecoilState(SearchState);

  const resetToInitial = () => {
    resetSearch();
  };

  //검색조건 유지
  const beforeSearch = useRef(search);
  useEffect(() => {
    beforeSearch.current = search;
  }, []);

  const setBeforeSearch = () => {
    setSearch(beforeSearch.current);
    console.log("After setSearch:", search);
  };

  //카테고리 업데이트
  const updateCategory = (categoryCode: string, categoryName: string) => {
    setSearch((prev) => ({
      ...prev,
      searchCategoryType: {
        comm_cd: categoryCode,
        comm_cd_nm: categoryName,
      },
    }));
  };

  //검색 타입 업데이트
  const updateSearchType = (searchType: string) => {
    setSearch((prev) => ({
      ...prev,
      searchType: searchType,
    }));
  };

  //검색 키워드 업데이트
  const updateSearchKeyword = (searchKeyword: string) => {
    setSearch((prev) => ({
      ...prev,
      searchKeyword: searchKeyword,
    }));
  };

  //정렬 타입 업데이트
  const updateSortType = (sortType: string) => {
    setSearch((prev) => ({
      ...prev,
      page: 1,
      sortType: sortType,
    }));
  };

  //페이지 업데이트
  const updatePage = (page: number) => {
    setSearch((prev) => ({
      ...prev,
      page: page,
    }));
  };

  //보기 갯수 업데이트
  const updatePageSize = (pageSize: number) => {
    setSearch((prev) => ({
      ...prev,
      page: 1,
      pageSize: pageSize,
    }));
  };

  return {
    search,
    setSearch,
    resetSearch: resetToInitial,
    setBeforeSearch,
    updateCategory,
    updateSearchType,
    updateSearchKeyword,
    updateSortType,
    updatePage,
    updatePageSize,
  };
};
