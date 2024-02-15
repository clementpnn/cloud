import ReactDOM from "react-dom/client";
import { RouterProvider } from "@tanstack/react-router";
import "@/index.css"
import router from "@/routes/routes";
import { Toaster } from 'sonner'

ReactDOM.createRoot(document.getElementById("root")!).render(
  <>
    <Toaster />
    <RouterProvider router={router} />
  </>
);