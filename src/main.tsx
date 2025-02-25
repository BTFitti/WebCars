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
import { Private } from "./routes/Private.tsx";
import { register } from "swiper/element";
register();
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { ErrorPage } from "./pages/error/index.tsx";
import { Toaster } from "react-hot-toast";

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
        element: (
          <Private>
            <Dashboard />
          </Private>
        ),
      },
      {
        path: "/dashboard/new",
        element: (
          <Private>
            <New />
          </Private>
        ),
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
  {
    path: "*",
    element: <ErrorPage />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
     <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          success: {
            style: {
              boxShadow: "0px 0px 10px 0px green",
              padding: "16px",
              color: "#121212",
            },
          },
          error:{
            style: {
              boxShadow: "0px 0px 10px 0px red",
              padding: "16px",
              color: "#121212",
            },
            icon: "⚠️"
          }
        }}
        containerStyle={{
          top: 15,
          left: 15,
          bottom: 15,
          right: 15,
        }}
      />
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);
