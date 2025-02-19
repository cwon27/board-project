import axios from "axios";
import { BoardData } from "../model/types";

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

  saveData.append("formData", JSON.stringify(formdata));

  const response = await apiUrl.post("/board/save", saveData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};
