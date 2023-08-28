import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import { Landing } from "./pages/Landing";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Faq } from "./pages/FAQ";
import { ErrorPage } from "./pages/Error";

const router = createBrowserRouter([
  { path: "/", element: <Landing />, errorElement: <ErrorPage /> },
  { path: "/faq", element: <Faq />, errorElement: <ErrorPage /> },
]);
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(<RouterProvider router={router} />);
