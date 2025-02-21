import axios from "axios";
import { BoardData, SearchData } from "../model/types";

const apiUrl = axios.create({
  baseURL: "http://localhost:8080/api", // 실제 API 서버 주소로 변경
  headers: { "Content-Type": "application/json" },
});

// 카테고리 데이터 가져오기
export const getCategoryData = async () => {
  const response = await apiUrl.get("/common/category");
  return response.data.categoryData;
};

//글 등록
export const saveBoard = async (formdata: BoardData, fileItems: File[]) => {
  const saveData = new FormData();
  fileItems.forEach((file) => {
    saveData.append("fileItems", file);
  });

  saveData.append(
    "formData",
    new Blob([JSON.stringify(formdata)], { type: "application/json" })
  );

  const response = await apiUrl.post("/board/save", saveData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

//리스트 가져오기
export const getBoard = async (searchData: SearchData) => {
  const { searchCategoryType, ...rest } = searchData;

  //DTO로 변환
  const searchBoardDTO = {
    searchCategoryType: searchCategoryType.comm_cd,
    ...rest,
  };

  const response = await apiUrl.post("/board/list", searchBoardDTO);

  console.log(response.data);

  return response.data;
};

//상세보기
export const getBoardDetail = async (board_no: number) => {
  const response = await apiUrl.get(`/board/listDetail/${board_no}`);

  console.log(response.data);

  return response.data;
};

//조회수
export const viewCount = async (board_no: number) => {
  await apiUrl.get(`/board/viewCount/${board_no}`);
};

//파일 데이터 가져오기
export const getFileData = async (board_no: number) => {
  const response = await apiUrl.get(`/file/data/${board_no}`);

  console.log(response);

  return response.data;
};

//파일 다운로드 요청 보냄
export const downloadFile = async (file_no: number) => {
  try {
    const response = await apiUrl.get(`/file/download/${file_no}`, {
      responseType: "blob",
    });

    console.log(response.headers);

    const contentDisposition =
      response.headers["content-disposition"] ||
      response.headers["Content-Disposition"];

    if (!contentDisposition) {
      throw new Error("Content-Disposition 헤더가 없습니다.");
    }

    let fileName = "download_file";

    //파일명 추출
    try {
      fileName = contentDisposition
        .split("filename=")[1]
        .replace(/"/g, "")
        .trim();
    } catch (e) {
      console.warn("파일명 추출 실패, 기본 파일명을 사용합니다.", e);
    }

    //파일 데이터 변환
    const blob = new Blob([response.data], {
      type: "application/octet-stream",
    });

    //다운로드 링크 생성
    const link = document.createElement("a");

    //blob url
    const url = window.URL.createObjectURL(blob);

    //다운로드 링크 설정
    link.href = url;

    //다운로드 파일명 설정
    link.setAttribute("download", fileName);

    //링크 DOM에 추가
    document.body.appendChild(link);

    //다운로드 시작
    link.click();

    //끝났으니 링크 제거
    document.body.removeChild(link);

    return 1; //성공!
  } catch (e) {
    alert("파일 다운로드 중 오류가 발생했습니다.");
    console.error("파일 다운로드 에러", e);
  }
};

//파일 다운로드수 증가
export const downloadincrement = async (file_no: number) => {
  await apiUrl.get(`/file/downloadCnt/${file_no}`);
};

//비밀번호 확인
export const passwordCheck = async (boardNo: number, password: string) => {
  console.log({ boardNo, password }); // 데이터 확인
  const response = await apiUrl.post(
    `/board/checkPassword/${boardNo}`,
    password
  );
  return response.data;
};

//데이터 삭제
export const deleteData = async (boardNo: number) => {
  const response = await apiUrl.delete(`/board/delete/${boardNo}`);

  return response.data;
};

//글 수정
export const updateBoard = async (board_no:number,formdata: BoardData) => {
  const updateData = new FormData();
  //board_no 추가
  updateData.append("board_no",`${board_no}`);
  updateData.append("category_cd",formdata.category_cd);
  updateData.append("title",formdata.title);
  updateData.append("cont",formdata.cont);

  const response = await apiUrl.put("/board/update", updateData);

  return response.data;
}