//Read시 필요한 BoardList
export interface BoardList {
  board_no: number;
  category_cd: string;
  title: string;
  writer_nm: string;
  view_cnt: number;
  reg_dt: string;
}

//Category값
export interface CategoryData {
  comm_cd: string;
  comm_cd_nm: string;
}

//글 Creaete, Update시 필요한 데이터
export interface BoardData {
  category_cd: string;
  title: string;
  cont: string;
  writer_nm: string;
  password: string;
}

//파일 데이터
export interface FileItem {
  file: File | null; //선택된 파일데이터터
}
