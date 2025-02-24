import { downloadFile, downloadincrement } from "../apis/service";

//파일 다운로드
export const handleDownload = async (file_no: number) => {
  try {
    const result = await downloadFile(file_no);
    if (result == 1) {
      //다운로드 수 증가가
      await downloadincrement(file_no);
    }
  } catch (error) {
    console.error("파일 다운로드 중 오류 발생:", error);
  }
};
