import { RecoilRoot, useRecoilState } from "recoil";
import { useEffect, useState } from "react";
import axios from "axios";
import { boardListState, totalListAmountState } from "./store/text.atom";


function App() {
  const [boardList, setBoardList] = useRecoilState(boardListState);
  const [totalListAmount, setTotalListAmount] = useRecoilState(totalListAmountState);

  useEffect(() => {
    // Define your query parameters
    const searchCategoryType = "ALL";  // Set this dynamically as needed
    const searchType = "all";  // Set this dynamically as needed
    const searchKeyword = "";  // Set this dynamically as needed
    const sortType = "";
    const page = 1;
    const pageSize = 10;

    axios
      .get("http://localhost:8080/api/board/getBoardList", {
        params: {
          searchCategoryType,
          searchType,
          searchKeyword,
          sortType,
          page,
          pageSize
        },
      })
      .then((response) => {
        // Handle the response
        setBoardList(response.data.boardList);
        setTotalListAmount(response.data.totalListAmount);
      })
      .catch((error) => {
        console.error("Error fetching board list:", error);
      });
  }, []); 


  // Set this dynamically as needed
   return (
        <div>
        <h1>Board List</h1>
        <div>Total Items: {totalListAmount}</div>
        <ul>
          {boardList.map((board, index) => (
            <li key={index}>{board.board_no}</li>
          ))}
        </ul>
      </div>
  )
}

export default App
