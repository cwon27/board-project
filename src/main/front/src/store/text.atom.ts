import { atom } from "recoil";
import { CategoryData, SearchData } from "../model/types";

//카테고리 타입 상태
export const CategoryState = atom<CategoryData>({
  key: "CategoryState",
  default: {
    comm_cd: "ALL",
    comm_cd_nm: "전체",
  },
});

export const SearchState = atom<SearchData>({
  key: "SearchState",
  default: {
    searchCategoryType: {
      comm_cd: "ALL",
      comm_cd_nm: "전체",
    },
    searchType: "all",
    searchKeyword: "",
    sortType: "latest",
    page: 1,
    pageSize: 10,
  },
});
