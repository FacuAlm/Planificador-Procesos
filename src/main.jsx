import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import InfoProceso, { loader as InfoProcesoLoader } from "./pages/InfoProceso";

const router = createBrowserRouter([
  { path: "/", element: <App /> },
  {
    path: "/procesos/:procesoId",
    element: <InfoProceso />,
    loader: InfoProcesoLoader,
  },
  {
    path: "/procesos/:procesoId/eliminar",
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
