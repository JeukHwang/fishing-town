import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router/dom";
import { Toaster } from "./components/ui/sonner";
import { UserProfileProvider } from "./hooks/use-user";
import "./index.css";
import devRouter from "./router";

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <UserProfileProvider>
      <RouterProvider router={devRouter} />
      <Toaster />
    </UserProfileProvider>
  </StrictMode>
);
