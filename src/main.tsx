
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import Dashboard from './components/Dashboard.tsx';
import Landing from './components/Landing.tsx';


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
    element: <Dashboard />
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />   
  </StrictMode>
);
  