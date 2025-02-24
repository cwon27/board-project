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

  return response.data;
};

//상세보기
export const getBoardDetail = async (board_no: number) => {
  try {
    const response = await apiUrl.get(`/board/listDetail/${board_no}`);
    if (!response.data) {
      throw new Error('데이터가 존재하지 않습니다')
    }

    return response.data;
  } catch (e: any) {
    if (e.response) {
      alert(`에러: ${e.response.data}`); 
      location.href="/list";
    } else {
      alert("알 수 없는 오류 발생");
    }
  }
};

//조회수
export const viewCount = async (board_no: number) => {
  await apiUrl.get(`/board/viewCount/${board_no}`);
};

//파일 데이터 가져오기
export const getFileData = async (board_no: number) => {
  const response = await apiUrl.get(`/file/data/${board_no}`);

  return response.data;
};

//파일 다운로드 요청 보냄
export const downloadFile = async (file_no: number) => {
  try {
    const response = await apiUrl.get(`/file/download/${file_no}`, {
      responseType: "blob",
    });

    console.log(response.headers);

    console.log(response);

    const contentDisposition =
      response.headers["content-disposition"] ||
      response.headers["Content-Disposition"];

    if (!contentDisposition) {
      throw new Error("Content-Disposition 헤더가 없습니다.");
    }

    let fileName = "download_file";

    //파일명 추출
    try {
      fileName = decodeURIComponent(
        contentDisposition.split("filename=")[1].replace(/"/g, "").trim()
      );
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
export const updateBoard = async (
  board_no: number,
  formdata: BoardData,
  fileItems: File[]
) => {
  const updateData = new FormData();
  //board_no 추가
  updateData.append(
    "formData",
    new Blob(
      [
        JSON.stringify({
          board_no: board_no,
          category_cd: formdata.category_cd,
          title: formdata.title,
          cont: formdata.cont,
        }),
      ],
      { type: "application/json" }
    )
  );

  //파일 추가
  fileItems.forEach((file) => {
    updateData.append("fileItems", file);
  });

  const response = await apiUrl.put("/board/update", updateData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

//기존 파일 삭제(수정시 사용)
export const deleteFile = async (save_path: string, file_no: number) => {
  const response = await apiUrl.delete("/file/delete", {
    params: {
      save_path: save_path,
      file_no: file_no,
    },
  });

  return response.data;
};
