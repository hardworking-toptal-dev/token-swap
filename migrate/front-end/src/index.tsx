import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import { Landing } from "./pages/Landing";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Faq } from "./pages/FAQ";
import { ErrorPage } from "./pages/Error";
import { createContext, useState } from "react";
import type { User } from "@prisma/client";

const router = createBrowserRouter([
  { path: "/", element: <Landing />, errorElement: <ErrorPage /> },
  { path: "/faq", element: <Faq />, errorElement: <ErrorPage /> },
]);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

export const UserContext = createContext(
  {} as {
    user: User;
    setUser: React.Dispatch<React.SetStateAction<User>>;
  }
);

function IndexWrapper() {
  const [user, setUser] = useState({} as User);

  return (
    <UserContext.Provider value={{ user: user, setUser: setUser }}>
      <RouterProvider router={router} />
    </UserContext.Provider>
  );
}

root.render(<IndexWrapper />);
