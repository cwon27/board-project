import { useMutation } from "@tanstack/react-query";
import { deleteFile } from "../apis/service";

//기존 파일이면 삭제
export const useDeleteFile = () => {
  return useMutation({
    mutationFn: ({
      save_path,
      file_no,
    }: {
      save_path: string;
      file_no: number;
    }) => deleteFile(save_path, file_no),
  });
};
