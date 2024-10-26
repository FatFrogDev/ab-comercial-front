
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import Landing from './components/Landing.tsx';
import Card from './components/Dashboard.tsx';


import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";


const router = createBrowserRouter([
  {
    path: "/",
    element: (
     <Landing />
    ),
  },
  {
    path: "/dashboard",
    element: <Card />
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />   
  </StrictMode>
);
  