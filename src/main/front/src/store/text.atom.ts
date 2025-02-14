import { atom } from "recoil";
import { BoardList } from "../model/types";

export const boardListState = atom<BoardList[]>({
    key: "boardListState",
    default: []
});

export const totalListAmountState = atom<number>({
    key: "totalListAmountState",
    default: 0
});








