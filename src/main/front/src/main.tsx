import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { RecoilRoot } from 'recoil'
import routes from "./route/index.tsx";
import './index.css'

const router = createBrowserRouter(routes); //경로 지정

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RecoilRoot>
      <RouterProvider router={router} />
    </RecoilRoot>
  </StrictMode>,
)
