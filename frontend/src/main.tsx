import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router/dom";
import { Toaster } from "./components/ui/sonner";
import "./index.css";
import devRouter from "./router";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={devRouter} />
    <Toaster />
  </StrictMode>
);
