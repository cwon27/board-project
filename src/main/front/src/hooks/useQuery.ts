import { useQuery } from "@tanstack/react-query"
import { getBoardDetail, getFileData, viewCount } from "../apis/service";

//상세정보 데이터 가져오기
export const useBoardDetail = (boardNo?: number)=>{
    return useQuery({
        queryKey: ["detailData", boardNo],
        queryFn: async () => {
            if(!boardNo) throw new Error("게시글 번호가 없습니다.");

            //게시물 상세정보, 등록 파일 정보
            const [boardDetail, fileData] = await Promise.all([
                getBoardDetail(boardNo),
                getFileData(boardNo)
            ])
            //조회수 증가
            await viewCount(boardNo);

            return{boardDetail, fileData}
        },
        enabled:!!boardNo // boardNo가 있을 때만 사용
    })
}

//수정 데이터 가져오기(조회수 빠짐)
export const useBoardUpdate = (isUpdate:boolean,boardNo?: number)=>{
    return useQuery({
        queryKey: ["detailData", boardNo],
        queryFn: async () => {
            if(!boardNo) throw new Error("게시글 번호가 없습니다.");

            //게시물 상세정보, 등록 파일 정보
            const [boardDetail, fileData] = await Promise.all([
                getBoardDetail(boardNo),
                getFileData(boardNo)
            ])

            return{boardDetail, fileData}
        },
        enabled:isUpdate
    })
}