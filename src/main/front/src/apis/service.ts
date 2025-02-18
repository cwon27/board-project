import axios from "axios";

const apiUrl = axios.create({
  baseURL: "http://localhost:8080/api", // 실제 API 서버 주소로 변경
  headers: { "Content-Type": "application/json" },
});

// 카테고리 데이터 가져오기
export const getCategoryData = async () => {
  const response = await apiUrl.get("/common/category");
  return response.data.categoryData;
};
