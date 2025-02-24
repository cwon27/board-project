import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RecoilRoot } from "recoil";
import { App } from "./App.tsx";
import { PwCheck } from "./components/layout/board/boardDetail/PwCheck.tsx";
import { BoardList } from "./route/pages/BoardList.tsx";
import { BoardDetail } from "./route/pages/BoardDetail.tsx";
import { BoardForm } from "./route/pages/BoardForm.tsx";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route path="/*" element={<App />}>
              <Route path="list" element={<BoardList />} />
              <Route path="detail/:board_no" element={<BoardDetail />} />
              <Route path="write" element={<BoardForm isUpdate={false} />} />
              <Route
                path="update/:board_no"
                element={<BoardForm isUpdate={true} />}
              />
            </Route>
            <Route path="/pwCheck/:board_no" element={<PwCheck />} />
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </RecoilRoot>
  </StrictMode>
);
