import { useQuery } from "@tanstack/react-query";
import {
  getBoard,
  getBoardDetail,
  getCategoryData,
  getFileData,
  viewCount,
} from "../apis/service";
import { CategoryData, SearchData } from "../model/types";

//상세정보 데이터 가져오기
export const useBoardDetail = (boardNo?: number) => {
  return useQuery({
    queryKey: ["detailData", boardNo],
    queryFn: async () => {
      if (!boardNo) throw new Error("게시글 번호가 없습니다.");

      //게시물 상세정보, 등록 파일 정보
      const [boardDetail, fileData] = await Promise.all([
        getBoardDetail(boardNo),
        getFileData(boardNo),
      ]);
      //조회수 증가
      await viewCount(boardNo);

      return { boardDetail, fileData };
    },
    enabled: !!boardNo, // boardNo가 있을 때만 사용
  });
};

//수정 데이터 가져오기(조회수 빠짐)
export const useBoardUpdate = (isUpdate: boolean, boardNo?: number) => {
  return useQuery({
    queryKey: ["detailData", boardNo],
    queryFn: async () => {
      if (!boardNo) throw new Error("게시글 번호가 없습니다.");

      //게시물 상세정보, 등록 파일 정보
      const [boardDetail, fileData] = await Promise.all([
        getBoardDetail(boardNo),
        getFileData(boardNo),
      ]);

      return { boardDetail, fileData };
    },
    enabled: isUpdate,
  });
};

//카테고리 값 가져오기
export const useCategoryData = () => {
  return useQuery<CategoryData[]>({
    queryKey: ["categoryData"],
    queryFn: getCategoryData,
  });
};

//검색조건으로 list 가져오기
export const useBoardList = (search: SearchData) => {
  return useQuery({
    queryKey: ["boardList", search.sortType, search.pageSize, search.page],
    queryFn: () => getBoard(search),
  });
};
