export interface BoardList {
    board_no: number;
    category_cd : String;
    title : String;
    writer_nm : String;
    view_cnt : number;
    reg_dt : String;
}

export interface Category {
    comm_cd : String;
    comm_cd_nm : String;
}
