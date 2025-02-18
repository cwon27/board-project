import { atom } from "recoil";
import { CategoryData } from "../model/types";

//카테고리 타입 상태
export const CategoryState = atom<CategoryData>({
    key:"CategoryState",
    default:{
        comm_cd: "ALL",
        comm_cd_nm: "전체"
    }
});











