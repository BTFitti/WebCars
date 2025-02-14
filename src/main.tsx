import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { Home } from "./pages/home/index.tsx";
import { Login } from "./pages/login/index.tsx";
import { Signup } from "./pages/signup/index.tsx";
import { CarDetail } from "./pages/carDetail/index.tsx";
import { Layout } from "./components/layout/index.tsx";
import { Dashboard } from "./pages/dashboard/index.tsx";
import { New } from "./pages/dashboard/new/index.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AuthProvider from "./context/authContext.tsx";

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/details/:id",
        element: <CarDetail />,
      },
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/dashboard/new",
        element: <New />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);
