import ReactDOM from "react-dom/client";
import { RouterProvider } from "@tanstack/react-router";
import "@/index.css"
import router from "@/routes/routes";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />
);